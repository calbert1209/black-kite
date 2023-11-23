import * as http from "node:https";
import queryString from "node:querystring";

export function fetchHorizonsData(startTime, stopTime) {
  if (!startTime || !stopTime) {
    throw new Error("Invalid arguments, startTime & stopTime required.");
  }
  const formData = {
    MAKE_EPHEM: "YES",
    COMMAND: "301",
    EPHEM_TYPE: "OBSERVER",
    CENTER: "coord@399",
    COORD_TYPE: "GEODETIC",
    SITE_COORD: "'139.484444,35.300556,0'",
    START_TIME: startTime,
    STOP_TIME: stopTime,
    STEP_SIZE: "'1 HOURS'",
    QUANTITIES: "'4'",
    REF_SYSTEM: "'ICRF'",
    CAL_FORMAT: "'CAL'",
    CAL_TYPE: "'M'",
    TIME_DIGITS: "'MINUTES'",
    ANG_FORMAT: "'HMS'",
    APPARENT: "'AIRLESS'",
    RANGE_UNITS: "'AU'",
    SUPPRESS_RANGE_RATE: "'NO'",
    SKIP_DAYLT: "'NO'",
    SOLAR_ELONG: "'0,180'",
    EXTRA_PREC: "'NO'",
    R_T_S_ONLY: "'NO'",
    CSV_FORMAT: "'YES'",
    OBJ_DATA: "'NO'",
  };

  const queryParams = queryString.stringify(formData);

  const options = {
    method: "GET",
    hostname: "ssd.jpl.nasa.gov",
    port: null,
    path: `/api/horizons.api?${queryParams}`,
    headers: {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("error", reject);

      res.on("end", () => {
        const { statusCode } = res;
        if (statusCode !== 200) {
          reject(new Error(`Response status code: ${statusCode}`));
        }
        const body = Buffer.concat(chunks);
        resolve(body.toString());
      });
    });

    req.end();
  });
}
