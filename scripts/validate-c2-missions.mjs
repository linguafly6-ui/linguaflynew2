import fs from "node:fs";
import path from "node:path";

const directory = "content/canonical-missions/c2";
const requireAll = process.env.REQUIRE_ALL_MISSIONS === "true";
const files = fs.readdirSync(directory)
  .filter((name) => /^\d{3}\.json$/.test(name))
  .sort();

if (files.length === 0) {
  throw new Error("No C2 mission JSON files were found.");
}

const expectedKeys = ["explore", "practice", "grammar", "pronunciation", "reading", "writing", "speaking", "listening"];
const seen = new Set();

for (const file of files) {
  const missionNumber = Number(file.slice(0, 3));
  if (missionNumber < 1 || missionNumber > 100) {
    throw new Error(`Mission file is outside the 001-100 range: ${file}`);
  }
  if (seen.has(missionNumber)) throw new Error(`Duplicate mission number: ${file}`);
  seen.add(missionNumber);

  const fullPath = path.join(directory, file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (error) {
    throw new Error(`Invalid JSON in ${fullPath}: ${error.message}`);
  }

  if (!Array.isArray(data.sections) || data.sections.length !== 8) {
    throw new Error(`${file}: expected exactly 8 sections.`);
  }

  data.sections.forEach((section, index) => {
    const key = expectedKeys[index];
    if (section.sectionKey !== key) {
      throw new Error(`${file}: section ${index + 1} must be "${key}", got "${section.sectionKey}".`);
    }
    const items = section.exercise?.items;
    if (!Array.isArray(items) || items.length !== 10) {
      throw new Error(`${file}: ${key} must contain exactly 10 items; got ${Array.isArray(items) ? items.length : "no items"}.`);
    }
    const positions = items.map((item) => item.position);
    if (positions.some((position, itemIndex) => position !== itemIndex + 1)) {
      throw new Error(`${file}: ${key} item positions must be consecutive from 1 to 10.`);
    }
  });

  if (data.mission?.position !== missionNumber) {
    throw new Error(`${file}: mission.position must equal ${missionNumber}.`);
  }
  console.log(`PASS ${file}: 8 sections × 10 items`);
}

if (requireAll) {
  const missing = Array.from({ length: 100 }, (_, index) => index + 1)
    .filter((number) => !seen.has(number))
    .map((number) => String(number).padStart(3, "0"));
  if (missing.length) {
    throw new Error(`Course incomplete: missing missions ${missing.join(", ")}`);
  }
  console.log("PASS complete course: all 100 missions are present.");
} else {
  console.log(`PASS partial build: ${files.length}/100 missions checked. Run workflow_dispatch with require_all=true for the final completeness gate.`);
}
