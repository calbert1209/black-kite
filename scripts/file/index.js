import { dirname, resolve } from "node:path";
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Resolve path relative to calling module
 * @param {string} importMetaUrl value of `import.meta.url`
 * @param  {...any} parts any other parts of the path to resolve
 * @returns {string}
 */
export function relativePath(importMetaUrl, ...parts) {
  const scriptDirPath = dirname(fileURLToPath(importMetaUrl));
  return resolve(scriptDirPath, ...parts);
}

/**
 * Write data to file as JSON
 * @param {string} filePath
 * @param {any} data
 * @param {boolean} pretty true when data should be formatted before writing
 */
export function writeJsonFileSync(filePath, data, pretty = false) {
  const stringifyArgs = pretty ? [null, 2] : [];
  const stringified = JSON.stringify(data, ...stringifyArgs);
  return writeFileSync(filePath, stringified);
}

/**
 * Read and parse JSON file
 * @param {string} filePath
 * @returns {any} contents of file, parsed as JSON
 */
export function readJsonFileSync(filePath) {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data.toString());
}
