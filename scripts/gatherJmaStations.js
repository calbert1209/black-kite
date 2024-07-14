import * as http from "node:https";
import { fetchFromOptions } from "./horizons-api/fetch.js";

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
  console.log(resp);
})();
