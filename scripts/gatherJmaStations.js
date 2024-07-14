import { fetchFromOptions } from "./horizons-api/fetch.js";
import { parse } from "node-html-parser";
import { relativePath, writeJsonFileSync } from "./file/index.js";

/* cspell:ignore kaiyou,suisan */

function fetchJmaStationTable(year) {
  const options = {
    method: "GET",
    hostname: "www.data.jma.go.jp",
    port: null,
    path: `/kaiyou/db/tide/suisan/station${year}.php`,
    headers: {
      Accept: "*/*",
      "User-Agent": "black-kite script",
    },
  };

  return fetchFromOptions(options);
}

(async function main() {
  const [_bin, _script, year] = process.argv;
  if (!year) {
    console.log("Please provide year");
    process.exit();
  }

  const resp = await fetchJmaStationTable(year);
  const root = parse(resp);
  const trs = root.querySelectorAll("tr.mtx");
  const data = [];
  for (const tr of [...trs]) {
    const tdChildren = tr.childNodes.filter((c) => c.rawTagName === "td");
    if (tdChildren.length < 17) continue;

    data.push(tdChildren.map((td) => td.textContent).slice(0, 8));
  }

  const normalizedData = data.map(
    ([id, symbol, name, lat, long, msl_rsh, msl, rsh]) => ({
      id,
      symbol,
      name,
      long,
      lat,
      "msl-rsh": msl_rsh,
      msl,
      rsh,
    })
  );

  const outputFilePath = relativePath(
    import.meta.url,
    "..",
    "data",
    "main",
    `${year}-jma-stations.json`
  );

  writeJsonFileSync(outputFilePath, normalizedData, true);
})();
