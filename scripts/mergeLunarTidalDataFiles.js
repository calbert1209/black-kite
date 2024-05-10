import {
  readJsonFileSync,
  relativePath,
  writeJsonFileSync,
} from "./file/index.js";

/**
 * @typedef { 'lunar' | 'tidal' | 'merged' } DataType
 */

/** @type { DataType[] } */
const DATA_TYPES = ["lunar", "tidal"];

/**
 * Get path to data file per type and year
 * @param {DataType} type
 * @param {string} year
 * @returns
 */
function getFilePath(type, year) {
  const fileName = `${year}-${type}-data.json`;
  return relativePath(import.meta.url, "../data/main", fileName);
}

/**
 * @typedef {Object} TidalEvent
 * @property {string} timeStamp - event local date-time as ISO String
 * @property {number} level - level relative to sea level in centimeters
 * @property {'hourly' | 'low' | 'high'} type - event type
 */

/**
 * @typedef { Object } NormalizedTidalEvent
 * @property { string } utcDate - event UTC date-time as ISO String
 * @property { string } localDate - event local date-time as ISO String
 * @property { number } level - level relative to sea level in centimeters
 * @property {'hourly' | 'low' | 'high'} type - event type
 */

/**
 * Normalize tidal event
 * @param { TidalEvent } event
 * @returns { NormalizedTidalEvent }
 */
function normalizeTidalEvent({ timeStamp, ...rest }) {
  const utcDate = new Date(timeStamp).toISOString();
  return {
    utcDate,
    localDate: timeStamp,
    ...rest,
  };
}

/**
 *
 * @param { Record<string, TidalEvent[]> } object
 * @param { string } year
 * @returns {string[] } array of keys that match current year
 */
function getYearsKeys(object, year) {
  return Object.keys(object).filter((key) => new RegExp(`^${year}`).test(key));
}

const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

/**
 * Log a message to the console in a provided color
 * @param {string} message message to print
 * @param {string} color ANSI escape code
 */
function colorPrint(message, color) {
  console.log(`${color}${message}${RESET}`);
}

(function main() {
  if (process.argv.length < 3) {
    console.log("Please include year argument");
    process.exit();
  }

  const year = process.argv[2];

  const paths = DATA_TYPES.map((type) => getFilePath(type, year));
  const [rawLunarData, rawTidalData] = paths.map(readJsonFileSync);
  const yearsKeys = getYearsKeys(rawTidalData, year);

  const output = {};
  for (const key of yearsKeys) {
    /** @type { NormalizedTidalEvent[] } */
    const tidalEvents = rawTidalData[key].map(normalizeTidalEvent);
    const lunarEvents = rawLunarData[key];

    output[key] = { tidalEvents, lunarEvents };
  }

  const outputFilePath = getFilePath("merged", year);
  writeJsonFileSync(outputFilePath, output, true);
  colorPrint(`Wrote to file:\n${outputFilePath}`, GREEN);
})();
