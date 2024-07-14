import { dirname, resolve } from "node:path";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
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
  ensureParentPath(filePath);

  const stringifyArgs = pretty ? [null, 2] : [];
  const stringified = JSON.stringify(data, ...stringifyArgs);
  return writeFileSync(filePath, stringified, { flag: "wx" });
}

/**
 * Write data to file as CSV
 * @param {string} filePath
 * @param {string[]} data
 */
export function writeCsvFileSync(filePath, data) {
  writeFileSync(filePath, data.join("\n"), { flag: "wx" });
}

/**
 * Read and parse JSON file
 * @param {string} filePath
 * @returns {any} contents of file, parsed as JSON
 */
export function readJsonFileSync(filePath) {
  const data = readFileSync(filePath);
  return JSON.parse(data.toString());
}

function ensureParentPath(filePath) {
  const parentPath = dirname(filePath);
  if (!existsSync(parentPath)) {
    mkdirSync(parentPath, { recursive: true });
  }
}
