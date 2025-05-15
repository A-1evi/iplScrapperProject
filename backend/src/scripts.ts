import "dotenv/config";
import puppeteer, { Browser } from "puppeteer";
import { drizzle } from "drizzle-orm/libsql";
import { matchesFixtureTable, pointsTable } from "./db/schema";

const db = drizzle(process.env.DB_FILE_NAME!);

const url = "https://www.iplt20.com";

async function main() {
  try {
    const browser: Browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    // Create a new page
    const page = await browser.newPage();

    await page.goto(url + "/points-table/men", {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector(".table-qualified");

    const pointsTableData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("tr")).filter(
        (row) => row.children.length >= 8
      );
      return rows.map((row) => {
        const teamCell = row.children[2];
        const teamLogo = teamCell?.querySelector("img")?.src || "";

        return {
          position: parseInt(row.children[0]?.textContent?.trim() || "0", 10),
          team: teamCell?.textContent?.trim() || "",
          teamLogo: teamLogo,
          played: parseInt(row.children[3]?.textContent?.trim() || "0", 10),
          wins: parseInt(row.children[4]?.textContent?.trim() || "0", 10),
          losses: parseInt(row.children[5]?.textContent?.trim() || "0", 10),
          nrr: parseFloat(
            row.children[7]?.textContent?.trim() || "0.0"
          ).toString(),
          points: parseInt(row.children[10]?.textContent?.trim() || "0", 10),
        };
      });
    });

    const existingData = await db.select().from(pointsTable);

    const hasDataChanged = pointsTableData.some((newData) => {
      const existingTeam = existingData.find(
        (team) => team.team === newData.team
      );
      if (!existingTeam) return true;

      return (
        existingTeam.position !== newData.position ||
        existingTeam.played !== newData.played ||
        existingTeam.wins !== newData.wins ||
        existingTeam.losses !== newData.losses ||
        existingTeam.points !== newData.points ||
        existingTeam.nrr !== newData.nrr
      );
    });

    if (hasDataChanged) {
      await db.delete(pointsTable);

      for (const data of pointsTableData) {
        await db.insert(pointsTable).values(data);
      }
      console.log("Points table data updated with new values");
    } else {
      console.log("No changes in points table data, skipping update");
    }

    await page.goto(url + "/matches/fixtures", {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector("#team_archive");
    const fixturesData = await page.evaluate(() => {
      const matches = Array.from(
        document.querySelectorAll("#team_archive > li")
      );

      return matches.map((match) => {
        // Get match number
        const matchNoInfo = match
          .querySelector(".vn-matchOrder")
          ?.textContent?.trim();

        // Get match date and time
        const dateInfo = match
          .querySelector(".vn-matchDate")
          ?.textContent?.trim();

        const timeInfo = match
          .querySelector(".vn-matchTime")
          ?.textContent?.trim();

        // Get venue
        const venue = match.querySelector(".vn-venueDet")?.textContent?.trim();

        // Get teams info
        const teams = match.querySelectorAll(".vn-shedTeam");
        const team1 = teams[0]?.querySelector("h3")?.textContent?.trim();
        const team2 = teams[1]
          ?.querySelector(".vn-team-2 h3")
          ?.textContent?.trim();

        // Get team logos
        const team1Logo = teams[0]?.querySelector("img")?.src || "";
        const team2Logo = teams[1]?.querySelector("img")?.src || "";

        return {
          matchNo: matchNoInfo,
          date: dateInfo,
          time: timeInfo,
          venue: venue,
          team1: {
            name: team1 || "",
            logo: team1Logo,
          },
          team2: {
            name: team2 || "",
            logo: team2Logo,
          },
        };
      });
    });

    const existingFixtures = await db.select().from(matchesFixtureTable);

    const formattedFixtures = fixturesData.map((data) => ({
      matchNo: data.matchNo,
      date: data.date || "",
      time: data.time || "",
      venue: data.venue || "",
      team1: data.team1.name,
      team1Logo: data.team1.logo,
      team2: data.team2.name,
      team2Logo: data.team2.logo,
    }));

    const hasFixturesChanged = formattedFixtures.some((newFixture) => {
      const existingFixture = existingFixtures.find(
        (fix) => fix.matchNo === newFixture.matchNo
      );
      if (!existingFixture) return true;

      return (
        existingFixture.team1 !== newFixture.team1 ||
        existingFixture.team2 !== newFixture.team2 ||
        existingFixture.date !== newFixture.date ||
        existingFixture.time !== newFixture.time ||
        existingFixture.venue !== newFixture.venue
      );
    });

    if (hasFixturesChanged) {
      await db.delete(matchesFixtureTable);

      for (const fixtureData of formattedFixtures) {
        await db.insert(matchesFixtureTable).values(fixtureData);
      }
      console.log("Fixtures data updated with new values");
    } else {
      await db.select().from(matchesFixtureTable);
      console.log("No changes in fixtures data, skipping update");
    }

    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export default main;
