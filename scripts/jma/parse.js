import { Line } from "../../src/models/DataLine.js";

export function parseTidalData(data) {
  const lines = data
    .toString()
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => new Line(line, 9));

  const events = lines.reduce((agg, line) => {
    agg[line.dateString] = line.eventsAsObjects;
    return agg;
  }, {});

  return events;
}
