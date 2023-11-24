import { Line } from "../../src/models/DataLine.js";
import { fetchShonankoData } from "./fetch.js";
import { writeJsonFileSync, relativePath } from "../file/index.js";

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

const filePath = relativePath(
  import.meta.url,
  "../../data/",
  `${year}-shonanko.json`
);
writeJsonFileSync(filePath, events);
