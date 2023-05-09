import { TidalEvent } from "../../services/data-fetch";

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
    } else if (event.type === 'high') {
      highEvents.push(event);
    } else {
      lowEvents.push(event);
    }
  }

  const reverseIndex = createReverseIndex(hourlyEvents);

  return {
    hourlyEvents,
    highEvents,
    lowEvents,
    reverseIndex,
  };
}