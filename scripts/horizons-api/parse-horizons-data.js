import { readSvsMoonInfoSync } from "../nasa-svs/read-svs-moon-info.js";
import { fetchHorizonsData } from "./fetch.js";
import { getCsvLines, parseLine, collateParsedLines } from "./parsers.js";
import { relativePath, writeJsonFileSync } from "../file/index.js";

async function parseData(year) {
  const data = await fetchHorizonsData(`${year - 1}-12-31`, `${year}-12-31`);
  const lines = data.toString().split("\n");

  const svsInfo = readSvsMoonInfoSync(year);
  const parsedLines = getCsvLines(lines).map((line) =>
    parseLine(line, svsInfo)
  );
  return collateParsedLines(parsedLines);
}

(async function main() {
  const [_bin, _script, year] = process.argv;
  if (!year) {
    console.log("Please provide year");
  }
  const parsed = parseData(year);
  const outputFilePath = relativePath(
    import.meta.url,
    "..",

    "data"`${year}-shonanko-horizons-svs.json`
  );

  writeJsonFileSync(outputFilePath, parsed);
})();
