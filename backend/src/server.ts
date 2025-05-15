import express from "express";
import cors from "cors";
import { drizzle } from "drizzle-orm/libsql";
import { pointsTable, matchesFixtureTable } from "./db/schema";
import path from "path";
import main from "./scripts";

const app = express();
app.use(cors());
app.use(express.json());

const db = drizzle(process.env.DB_FILE_NAME!);
main();
interface PointsTableRow {
  position: number;
  team: string;
  matches: number;
  wins: number;
  losses: number;
  points: number;
}

app.get(
  "/api/points-table",
  async (req: express.Request, res: express.Response) => {
    try {
      const points = (
        await db.select().from(pointsTable).orderBy(pointsTable.position)
      )
        .filter((row) => row.team && row.position) // Filter out invalid entries
        .map((row) => ({
          position: row.position!,
          team: row.team!,
          matches: row.played ?? 0,
          wins: row.wins ?? 0,
          losses: row.losses ?? 0,
          points: row.points ?? 0,
          nrr: row.nrr ?? "0.0",
          teamLogo: row.teamLogo ?? "",
        }));
      res.json(points);
    } catch (error) {
      console.error("Error fetching points table:", error);
      res.status(500).json({ error: "Failed to fetch points table" });
    }
  }
);

// Endpoint for fixtures
app.get(
  "/api/fixtures",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const fixtures = await db
        .select()
        .from(matchesFixtureTable)
        .orderBy(matchesFixtureTable.matchNo);

      const formattedFixtures = fixtures.map((row) => ({
        matchNo: row.matchNo ?? "",
        date: row.date ?? "",
        time: row.time ?? "",
        venue: row.venue ?? "",
        team1: row.team1 ?? "",
        team2: row.team2 ?? "",
        team1Logo: row.team1Logo ?? "",
        team2Logo: row.team2Logo ?? "",
      }));

      res.json(formattedFixtures);
    } catch (error) {
      console.error("Error fetching fixtures:", error);
      res.status(500).json({ error: "Failed to fetch fixtures" });
    }
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
