#!/usr/bin/env node
/**
 * Build a reproducible SQL seed from canonical mission JSON.
 *
 * Safe by default: this script only reads files and reports counts.
 * Pass --write to create a SQL file. It NEVER connects to Cloudflare or
 * executes SQL; applying the generated file must be a separate, reviewed step
 * against the intended COURSE_DB Preview database.
 */
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const write = args.includes("--write");
const outputArg = args.find((arg) => arg.startsWith("--output="));
const outputPath = outputArg ? path.resolve(outputArg.slice("--output=".length)) : path.resolve("canonical-missions.seed.sql");
const root = path.resolve("public/canonical-missions");
const sources = [
  { directory: "c1", level: "C1", shape: "single" },
  { directory: "b2", level: "B2", shape: "collection" },
];

function sqlString(value) {
  return "'" + String(value).replaceAll("'", "''") + "'";
}

function addMission(rows, level, routeKey, mission) {
  if (!mission || typeof mission !== "object" || Array.isArray(mission)) {
    throw new Error(level + "/" + routeKey + ": mission must be an object");
  }
  const missionId = mission.mission?.missionId;
  if (typeof missionId !== "string" || !missionId.trim()) {
    throw new Error(level + "/" + routeKey + ": missing mission.missionId");
  }
  if (mission.course?.level !== level) {
    throw new Error(level + "/" + routeKey + ": expected course.level " + level);
  }
  const contentVersion = Number(mission.contentVersion ?? 1);
  if (!Number.isInteger(contentVersion) || contentVersion < 1) {
    throw new Error(level + "/" + routeKey + ": invalid contentVersion");
  }
  rows.push({ missionId, level, routeKey, contentVersion, json: JSON.stringify(mission) });
}

const rows = [];
for (const source of sources) {
  const directory = path.join(root, source.directory);
  if (!fs.existsSync(directory)) throw new Error("Missing source directory: " + directory);
  const files = fs.readdirSync(directory).filter((name) => name.endsWith(".json")).sort();
  for (const filename of files) {
    const fullPath = path.join(directory, filename);
    const parsed = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    if (source.shape === "single") {
      addMission(rows, source.level, path.basename(filename, ".json"), parsed);
    } else {
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error(fullPath + ": expected an object keyed by route id");
      }
      for (const [routeKey, mission] of Object.entries(parsed)) {
        addMission(rows, source.level, routeKey, mission);
      }
    }
  }
}

const ids = new Set();
const routeKeys = new Set();
for (const row of rows) {
  if (ids.has(row.missionId)) throw new Error("Duplicate missionId: " + row.missionId);
  const route = row.level + ":" + row.routeKey;
  if (routeKeys.has(route)) throw new Error("Duplicate route: " + route);
  ids.add(row.missionId);
  routeKeys.add(route);
}

const statements = rows.map((row) => `INSERT INTO canonical_missions
  (mission_id, level, route_key, content_version, content_json, published, updated_at)
VALUES
  (${sqlString(row.missionId)}, ${sqlString(row.level)}, ${sqlString(row.routeKey)},
   ${row.contentVersion}, ${sqlString(row.json)}, 1, datetime('now'))
ON CONFLICT(level, route_key) DO UPDATE SET
  mission_id = excluded.mission_id,
  content_version = excluded.content_version,
  content_json = excluded.content_json,
  published = 1,
  updated_at = datetime('now');`).join("\n\n");

console.log("Validated " + rows.length + " missions:");
for (const level of ["C1", "B2"]) {
  console.log("  " + level + ": " + rows.filter((row) => row.level === level).length);
}
console.log("Total JSON payload: " + rows.reduce((sum, row) => sum + Buffer.byteLength(row.json), 0) + " bytes");
if (!write) {
  console.log("Dry run only. Add --write --output=/path/to/seed.sql to generate SQL.");
  process.exit(0);
}
fs.writeFileSync(outputPath, statements + "\n", "utf8");
console.log("SQL seed written to " + outputPath);
