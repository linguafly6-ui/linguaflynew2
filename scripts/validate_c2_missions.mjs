import fs from "node:fs";
import path from "node:path";

const directory = "content/canonical-missions/c2";
const requireAll = process.env.C2_REQUIRE_ALL_MISSIONS === "true";
const files = fs.existsSync(directory)
  ? fs.readdirSync(directory).filter((name) => /^\d{3}\.json$/.test(name)).sort()
  : [];

if (files.length === 0) {
  console.error("C2: no mission JSON files found.");
  process.exit(1);
}

const expectedSections = [
  "explore", "practice", "grammar", "pronunciation",
  "reading", "writing", "speaking", "listening",
];
const found = new Set();
const errors = [];

for (const file of files) {
  const number = Number(file.slice(0, 3));
  if (number < 1 || number > 100) {
    errors.push(`${file}: mission number must be between 001 and 100.`);
    continue;
  }
  found.add(number);

  let mission;
  try {
    mission = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
  } catch (error) {
    errors.push(`${file}: invalid JSON (${error.message}).`);
    continue;
  }

  if (mission.course?.level !== "C2") errors.push(`${file}: course.level must be C2.`);
  if (mission.mission?.position !== number) {
    errors.push(`${file}: mission.position must equal its filename number (${number}).`);
  }
  if (mission.mission?.missionId !== `english-c2-m${String(number).padStart(3, "0")}`) {
    errors.push(`${file}: missionId does not match its filename.`);
  }

  const sections = mission.sections ?? [];
  const keys = sections.map((section) => section.sectionKey);
  if (sections.length !== 8 || keys.some((key, index) => key !== expectedSections[index])) {
    errors.push(`${file}: expected the eight sections in canonical order.`);
    continue;
  }

  for (const section of sections) {
    const items = section.exercise?.items;
    if (!Array.isArray(items) || items.length !== 10) {
      errors.push(`${file} / ${section.sectionKey}: expected exactly 10 activities/blocks.`);
    }
  }

  const lesson = sections[0]?.exercise?.lesson;
  for (const key of ["phrases", "grammar", "reading", "writing", "speaking", "listening", "examples", "communication"]) {
    if (!Array.isArray(lesson?.[key]) || lesson[key].length === 0) {
      errors.push(`${file} / Explore: lesson.${key} must contain at least one teaching element.`);
    }
  }
}

const missing = Array.from({ length: 100 }, (_, index) => index + 1).filter((n) => !found.has(n));
console.log(`C2 missions discovered: ${found.size}/100.`);
console.log(`Present mission range: ${found.size ? String(Math.min(...found)).padStart(3, "0") + "–" + String(Math.max(...found)).padStart(3, "0") : "none"}.`);
if (missing.length) {
  console.log(`Not created yet (${missing.length}): ${missing.map((n) => String(n).padStart(3, "0")).join(", ")}`);
}
if (requireAll && missing.length) errors.push(`C2 completion check failed: ${missing.length} of 100 missions are missing.`);

if (errors.length) {
  console.error("\nC2 validation errors:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("C2 structural checks passed.");
