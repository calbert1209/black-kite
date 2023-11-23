import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Line } from "../../src/models/DataLine.js";
import { fetchShonankoData } from "./fetch-shonanko-data.js";
import { writeFileSync } from "node:fs";

if (process.argv.length < 3) {
  console.log("Please include year argument");
  process.exit();
}

const year = process.argv[2];

const data = await fetchShonankoData(year);
const lines = data
  .toString()
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => new Line(line, 9));

const events = lines.reduce((agg, line) => {
  agg[line.dateString] = line.eventsAsObjects;
  return agg;
}, {});

const serialized = JSON.stringify(events);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDirPath = resolve(__dirname, "../data/");
const jsonFilePath = join(dataDirPath, `${year}-shonanko.json`);
writeFileSync(jsonFilePath, serialized);
