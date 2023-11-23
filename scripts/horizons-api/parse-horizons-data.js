import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { readSvsMoonInfoSync } from "./read-svs-moon-info.js";
import { fetchHorizonsData } from "./fetch.js";
import { getCsvLines, parseLine, collateParsedLines } from "./parsers.js";

const scriptDirPath = path.dirname(fileURLToPath(import.meta.url));
const dataDirPath = path.resolve(scriptDirPath, "..", "data");

const data = await fetchHorizonsData(`${year - 1}-12-31`, `${year}-12-31`);
const lines = data.toString().split("\n");

const svsInfo = readSvsMoonInfoSync(year);
const parsedLines = getCsvLines(lines).map((line) => parseLine(line, svsInfo));
const collatedLines = collateParsedLines(parsedLines);

const outputFilePath = path.resolve(
  dataDirPath,
  `${year}-shonanko-horizons-svs.json`
);
fs.writeFileSync(outputFilePath, JSON.stringify(collatedLines, null, 2));
