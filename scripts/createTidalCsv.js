import {
  relativePath,
  readJsonFileSync,
  writeCsvFileSync,
} from "./file/index.js";

(async function main() {
  if (process.argv.length < 3) {
    console.log("Please include year argument");
    process.exit();
  }

  const year = process.argv[2];
  const filePath = relativePath(
    import.meta.url,
    "../data/main",
    `${year}-tidal-data.json`
  );

  const contents = readJsonFileSync(filePath);
  const csvLines = [];
  let index = 0;
  for (const key of Object.keys(contents)) {
    const entry = contents[key];
    for (const { timeStamp, level, type } of entry) {
      index++;
      const line = `${index},${type},${level},${timeStamp}`;
      csvLines.push(line);
    }
  }

  const outputPath = relativePath(
    import.meta.url,
    "../data/main/",
    `${year}-tidal-data.csv`
  );
  writeCsvFileSync(outputPath, csvLines);
})();
