import fs from "node:fs";
import path from "node:path";

const directory = "content/canonical-missions/a1";
const requireAll = process.env.REQUIRE_ALL_MISSIONS === "true";
const expectedSections = [
  "explore",
  "practice",
  "grammar",
  "pronunciation",
  "reading",
  "writing",
  "speaking",
  "listening",
];

if (!fs.existsSync(directory)) {
  throw new Error(`Missing canonical curriculum directory: ${directory}`);
}

const files = fs.readdirSync(directory)
  .filter((name) => name.endsWith(".json"))
  .sort();

const missions = new Map();
for (const filename of files) {
  const match = /^(\d{3})\.json$/.exec(filename);
  if (!match) throw new Error(`Unexpected A1 mission filename: ${filename}`);

  const number = Number(match[1]);
  if (number < 1 || number > 100) {
    throw new Error(`Mission number outside A1 range 001–100: ${filename}`);
  }

  const fullPath = path.join(directory, filename);
  const mission = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  missions.set(number, mission);

  if (!Array.isArray(mission.sections) || mission.sections.length !== 8) {
    throw new Error(`${filename}: expected exactly 8 learning sections`);
  }

  for (let index = 0; index < expectedSections.length; index += 1) {
    const section = mission.sections[index];
    const expectedKey = expectedSections[index];
    if (section.sectionKey !== expectedKey || section.position !== index + 1) {
      throw new Error(`${filename}: section ${index + 1} must be ${expectedKey}`);
    }

    const items = section.exercise?.items;
    if (!Array.isArray(items)) {
      throw new Error(`${filename}: ${expectedKey} has no exercise items array`);
    }

    const expectedCount = expectedKey === "explore" ? null : 10;
    if (expectedCount !== null && items.length !== expectedCount) {
      throw new Error(`${filename}: ${expectedKey} must contain 10 activities; found ${items.length}`);
    }
    if (expectedKey === "explore" && (items.length < 10 || items.length > 50)) {
      throw new Error(`${filename}: explore vocabulary must contain 10–50 entries; found ${items.length}`);
    }
  }

  if (mission.mission?.position < 1 || mission.mission?.position > 10) {
    throw new Error(`${filename}: mission.position must be between 1 and 10`);
  }
}

if (missions.size === 0) throw new Error("No A1 mission JSON files found.");

const highest = Math.max(...missions.keys());
for (let number = 1; number <= highest; number += 1) {
  if (!missions.has(number)) {
    throw new Error(`Missing mission ${String(number).padStart(3, "0")} before the current curriculum frontier`);
  }
}

if (requireAll && missions.size !== 100) {
  throw new Error(`Full-curriculum release gate requires 100 missions; found ${missions.size}`);
}
if (requireAll) {
  for (let number = 1; number <= 100; number += 1) {
    if (!missions.has(number)) {
      throw new Error(`Full-curriculum release gate: missing mission ${String(number).padStart(3, "0")}`);
    }
  }
}

console.log(`A1 curriculum structure passed: ${missions.size}/100 missions present (frontier ${String(highest).padStart(3, "0")}).`);
if (!requireAll) {
  console.log("Full 001–100 completeness is available as a manual release gate.");
}
