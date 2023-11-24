import { fetchTidalData } from "./jma/fetch.js";
import { writeJsonFileSync, relativePath } from "./file/index.js";
import { parseTidalData } from "./jma/parse.js";

(async function main() {
  if (process.argv.length < 3) {
    console.log("Please include year argument");
    process.exit();
  }

  const year = process.argv[2];
  const data = await fetchTidalData(year);
  const events = parseTidalData(data);

  const filePath = relativePath(
    import.meta.url,
    "../data/main",
    `${year}-tidal-data.json`
  );
  writeJsonFileSync(filePath, events);
})();
