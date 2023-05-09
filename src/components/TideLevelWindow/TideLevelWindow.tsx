import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { TidalChart, TidalEvent, fetchData } from "../../services/data-fetch";
import { RenderConditionally } from "./../RenderConditionally";
import { HorizontalLevel } from "./../HorizontalLevel";
import { VerticalMarker } from "./../VerticalMarker";
import { TideLevelBar, TideLevelBarChart } from "./TideLevelBarChart";
import { PositionRelative } from "./../PositionRelative";
import { subtractDay, addDay, isToday } from "../../lib/dates";
import { colorRange } from "../../ui";

const leadingZeros = (n: number | string, digits: number) => {
  return `${n}`.padStart(digits, "0");
};

const createDateStamp = (d: Date) => {
  const year = d.getFullYear();
  const month = leadingZeros(d.getMonth() + 1, 2);
  const date = leadingZeros(d.getDate(), 2);
  return [year, month, date].join("-");
};

const createReverseIndex = (events: TidalEvent[]) => {
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

export const TideLevelWindow = () => {
  const [yearlyData, setYearlyData] = useState<TidalChart | null>(null);
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const decrementDate = useCallback(
    () => setCurrentDate((s) => subtractDay(s)),
    []
  );
  const incrementDate = useCallback(() => setCurrentDate((s) => addDay(s)), []);
  const setToToday = useCallback(() => setCurrentDate(new Date()), []);

  const dateStamp = useMemo(() => createDateStamp(currentDate), [currentDate]);
  useEffect(() => {
    fetchData("./2023-shonanko.json", (chart) => {
      setYearlyData(chart);
    });
  }, []);

  const { hourlyEvents, highEvents, lowEvents, reverseIndex } = useMemo(() => {
    if (!yearlyData) {
      return {
        hourlyEvents: [] as TidalEvent[],
        highEvents: [] as TidalEvent[],
        lowEvents: [] as TidalEvent[],
        reverseIndex: {} as Record<number, number>,
      };
    }

    const hourlyEvents: TidalEvent[] = [];
    const highEvents: TidalEvent[] = [];
    const lowEvents: TidalEvent[] = [];
    for (const event of yearlyData[dateStamp]) {
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
  }, [yearlyData, currentDate]);

  return (
    <>
      <h2>{dateStamp}</h2>
      <main>
        <RenderConditionally when={!!hourlyEvents.length}>
          <PositionRelative>
            <TideLevelBarChart>
              {hourlyEvents.map(({ level, timeStamp }) => (
                <TideLevelBar
                  key={timeStamp}
                  level={level}
                  color={colorRange[reverseIndex[level]]}
                />
              ))}
            </TideLevelBarChart>
            <RenderConditionally when={isToday(currentDate)}>
              <VerticalMarker />
            </RenderConditionally>
            <RenderConditionally when={!!highEvents.length}>
              {highEvents.map((event, index) => (
                <HorizontalLevel
                  key={event.timeStamp}
                  {...event}
                  reversed={index % 2 === 0}
                />
              ))}
            </RenderConditionally>
            <RenderConditionally when={!!lowEvents.length}>
              {lowEvents.map((event, index) => (
                <HorizontalLevel
                  key={event.timeStamp}
                  {...event}
                  reversed={index % 2 === 0}
                />
              ))}
            </RenderConditionally>
          </PositionRelative>
        </RenderConditionally>
        <button role="button" onClick={decrementDate}>
          -
        </button>
        <button role="button" onClick={setToToday}>
          today
        </button>
        <button role="button" onClick={incrementDate}>
          +
        </button>
      </main>
    </>
  );
};
