import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

export const readSvsMoonInfoSync = (year) => {
  const scriptDirPath = path.dirname(fileURLToPath(import.meta.url));
  const dataDirPath = path.resolve(scriptDirPath, "..", "data");
  const inputFilePath = path.resolve(dataDirPath, `mooninfo_${year}.json`);

  const data = fs.readFileSync(inputFilePath);
  const lines = JSON.parse(data.toString());

  return lines.reduce((agg, line) => {
    const isoDateString = new Date(line.time).toISOString();
    agg[isoDateString] = line;
    return agg;
  }, {});
};
