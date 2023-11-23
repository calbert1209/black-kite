import * as fs from "node:fs";
import { relativePath, readJsonFileSync } from "../file";

/**
 * Read and parse SVS Moon information
 * @param {number} year
 * @returns { Record<string, object> } Record of hourly moon position readings
 * where the key of each value is an ISO date-time string
 */
export const readSvsMoonInfoSync = (year) => {
  const dataFilePath = relativePath(
    import.meta.url,
    "../../data",
    `mooninfo_${year}.json`
  );
  if (!fs.existsSync(dataFilePath)) {
    throw new Error(`Invalid file path: ${dataFilePath}`);
  }

  const lines = readJsonFileSync(dataFilePath);

  return lines.reduce((agg, line) => {
    const isoDateString = new Date(line.time).toISOString();
    agg[isoDateString] = line;
    return agg;
  }, {});
};
