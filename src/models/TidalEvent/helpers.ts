import { compareAsc } from "../../lib/dates";
import { TidalEvent } from "../../services/data-fetch";

const orderByTimeStampAsc = (events: TidalEvent[]) =>
  events
    .map<[Date, TidalEvent]>((event) => [new Date(event.timeStamp), event])
    .sort((a, b) => compareAsc(a[0], b[0])).map(([_, event]) => event);

export const createReverseIndex = (events: TidalEvent[]) => {
  const sortedByLevel = [...events].sort((a, b) => a.level - b.level);
  const levelWithIndex = sortedByLevel.map(({ level }, index) => ({
    level,
    index: Math.floor(index / 2),
  }));
  return levelWithIndex.reduce((agg, { level, index }) => {
    agg[level] = index;
    return agg;
  }, {} as Record<number, number>);
};

export const collateDailyTidalEvents = (events: TidalEvent[]) => {
  const hourlyEvents: TidalEvent[] = [];
  const highEvents: TidalEvent[] = [];
  const lowEvents: TidalEvent[] = [];
  for (const event of events) {
    if (event.type === "hourly") {
      hourlyEvents.push(event);
    } else if (event.type === "high") {
      highEvents.push(event);
    } else {
      lowEvents.push(event);
    }
  }

  const reverseIndex = createReverseIndex(hourlyEvents);

  const extremityEvents = orderByTimeStampAsc([...highEvents, ...lowEvents]);

  return {
    hourlyEvents,
    highEvents,
    lowEvents,
    reverseIndex,
    extremityEvents,
  };
};
