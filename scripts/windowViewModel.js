const sampleData = require("../data/3-day-sample.json");
const { TimeZonedDate } = require("../src/models/TimeZonedDate");
const flatData = Object.values(sampleData)
  .flat(1)
  .filter((event) => event.type === "hourly")
  .map(({ timeStamp, ...rest }) => {
    const tzDate = new TimeZonedDate(timeStamp);
    return {
      timeStamp: tzDate,
      hour: tzDate.hours,
      ...rest,
    };
  });

const dateString = "2023-01-02T01:30:00+0900";

const targetIndex = flatData.findIndex((event) => {
  const targetDate = new TimeZonedDate(dateString);

  return (
    event.type === "hourly" && event.timeStamp.hasSameDateAndHour(targetDate)
  );
});

const bounds = [
  Math.max(0, targetIndex - 3),
  Math.min(flatData.length - 1, targetIndex + 4),
];

// console.log(flatData.slice(bounds[0], bounds[1]).map(event => event.timeStamp[Symbol.toStringTag]));
const valueOfDate = new TimeZonedDate(dateString).date.valueOf();
//                 sec     mn   hr   day
const oneDayInMS = 1_000 * 60 * 60 * 24;
console.log(new Date(valueOfDate - oneDayInMS));