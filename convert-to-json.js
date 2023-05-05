const fs = require("fs");
const { Line } = require('./DataLine');

const data = fs.readFileSync("./2023-shonanko.txt");
const lines = data
  .toString()
  .split("\n")
  .filter(line => line.length > 0)
  .map((line) => new Line(line, 9));

const events = lines.reduce((agg, line) => {
  agg[line.dateString] = line.eventsAsObjects;
  return agg;
}, {})

const serialized = JSON.stringify(events);

fs.writeFileSync('./2023-shonanko.json', serialized);