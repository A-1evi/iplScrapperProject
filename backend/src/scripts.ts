import "dotenv/config";
import puppeteer, { Browser } from "puppeteer";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import { pointsTable } from "./db/schema";

const db = drizzle(process.env.DB_FILE_NAME!);

const url = "https://www.iplt20.com";

async function main() {
  try {
    // Launch the browser
    const browser: Browser = await puppeteer.launch({
      headless: false, // Set to true if you don't want to see the browser UI
      defaultViewport: null,
      args: ["--start-maximized"], // Start with maximized window
    });

    // Create a new page
    const page = await browser.newPage();

    // Navigate to a website (example URL - replace with your target URL)
    await page.goto(url + "/points-table/men", {
      waitUntil: "networkidle2",
    });

    // Wait for the table to be loaded
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

    // Insert the scraped data into the database
    for (const data of pointsTableData) {
      await db.insert(pointsTable).values(data);
    }

    const pointTableFromDb = await db.select().from(pointsTable);
    console.log("Points Table Data from DB:", pointTableFromDb);

    await page.goto(url + "/matches/fixtures", {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector("#team_archive");
    const fixturesData = await page.evaluate(() => {
      const matches = Array.from(
        document.querySelectorAll("#team_archive > li")
      );
      return matches.map((match) => {
        // Get match date
        const matchNoInfo = match
          .querySelector("div:first-child > div:first-child > span:first-child")
          ?.textContent?.trim();

        // Get match time
        const timeInfo = match
          .querySelector(".vn-matchTime")
          ?.textContent?.trim();

        // Get venue
        const venue = match
          .querySelector(
            "div:first-child > div:nth-child(2) > span:first-child > p:first-child > span:first-child"
          )
          ?.textContent?.trim();

        // Get teams info
        const team1 = match
          .querySelector(
            "div:nth-child(2) div:nth-child(2) div:nth-child(1) div:nth-child(3) h3"
          )
          ?.textContent?.trim();
        const team2 = match
          .querySelector(
            "div:nth-child(2) div:nth-child(2) div:nth-child(3) div:nth-child(3) h3"
          )
          ?.textContent?.trim();

        // Get team logos
        const team1Logo =
          (
            match.querySelector(
              "div:nth-child(2) div:nth-child(2) div:nth-child(1) img"
            ) as HTMLImageElement
          )?.src || "";
        const team2Logo =
          (
            match.querySelector(
              "div:nth-child(2) div:nth-child(2) div:nth-child(3) img"
            ) as HTMLImageElement
          )?.src || "";

        return {
          matchNo: matchNoInfo,
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
    console.log("Points Table Data:", JSON.stringify(pointsTableData, null, 2));
    console.log("Fixtures Data:", JSON.stringify(fixturesData, null, 2));
    // console.log("Browser launched successfully!");

    // Close the browser when done
    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Disconnect from Prisma
  }
}

// Execute the main function
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
