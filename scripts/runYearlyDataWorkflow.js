import { spawnSync } from "node:child_process";

const year = process.argv[2];

if (!year) {
  console.error("Please provide a year. Example: npm run data:year -- 2026");
  process.exit(1);
}

const steps = [
  ["createLunarDataFile.js", "lunar data"],
  ["createTidalDataFile.js", "tidal data"],
];

for (const [script, label] of steps) {
  console.log(`\n[${year}] generating ${label}...`);

  const result = spawnSync(process.execPath, [`./scripts/${script}`, year], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    console.error(`\nStep failed: ${script}`);
    process.exit(result.status ?? 1);
  }
}

console.log(`\nCompleted yearly data workflow for ${year}.`);
