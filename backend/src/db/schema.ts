import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pointsTable = sqliteTable("points_table", {
  id: int().primaryKey({ autoIncrement: true }),
  position: int(),
  team: text(),
  teamLogo: text(),
  played: int(),
  wins: int(),
  losses: int(),
  nrr: text(),
  points: int(),
});


export const matchesFixtureTable = sqliteTable("matches_fixture",{
  id: int().primaryKey({autoIncrement: true}),
  matchNo: int(),
  time: text(),
  venue: text(),
  team1: text(),
  team2: text(),
  team1Logo: text(),
  team2Logo: text(),
})
