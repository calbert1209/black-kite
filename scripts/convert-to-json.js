const fs = require("fs");
const path = require("path");
const { Line } = require("../src/models/DataLine");

const dataDirPath = path.resolve(__dirname, '../data/');
const txtFilePath = path.join(dataDirPath, '2023-shonanko.txt');
const jsonFilePath = path.join(dataDirPath, '2023-shonanko.json');

const data = fs.readFileSync(txtFilePath);
const lines = data
  .toString()
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => new Line(line, 9));

const events = lines.reduce((agg, line) => {
  agg[line.dateString] = line.eventsAsObjects;
  return agg;
}, {});

const serialized = JSON.stringify(events);

fs.writeFileSync(jsonFilePath, serialized);
