import * as http from "node:https";

export function fetchShonankoData(year) {
  const options = {
    method: "GET",
    hostname: "www.data.jma.go.jp",
    port: null,
    path: `/kaiyou/data/db/tide/suisan/txt/${year}/D8.txt`,
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
