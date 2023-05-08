import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { TidalChart, TidalEvent, fetchData } from "../services/data-fetch";
import { RenderConditionally } from "./RenderConditionally";
import { HorizontalLevel } from "./HorizontalLevel";
import { VerticalMarker } from "./VerticalMarker";
import { TideLevelBar, TideLevelBarChart } from "./TideLevelBarChart";
import { PositionRelative } from "./PositionRelative";
import { decrementDay, incrementDay } from "../lib/dates";

const leadingZeros = (n: number | string, digits: number) => {
  return `${n}`.padStart(digits, "0");
};

const createDateStamp = (d: Date) => {
  const year = d.getFullYear();
  const month = leadingZeros(d.getMonth() + 1, 2);
  const date = leadingZeros(d.getDate(), 2);
  return [year, month, date].join("-");
};

const colorRangeValues = [
  [76, 183, 127],
  [91, 186, 144],
  [104, 186, 156],
  [113, 186, 167],
  [117, 183, 176],
  [120, 180, 183],
  [122, 177, 188],
  [120, 172, 191],
  [117, 167, 192],
  [110, 159, 193],
  [100, 152, 190],
  [84, 140, 185],
] as const;
export const colorRange = colorRangeValues.map(
  ([r, g, b]) => `rgb(${r},${g},${b})`
);

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

  const dateStamp = useMemo(() => createDateStamp(currentDate), [currentDate]);
  useEffect(() => {
    fetchData("./2023-shonanko.json", (chart) => {
      setYearlyData(chart);
    });
  }, []);

  const { hourlyEvents, extremityEvents, reverseIndex } = useMemo(() => {
    if (!yearlyData) {
      return {
        hourlyEvents: [],
        extremityEvents: [],
        reverseIndex: {} as Record<number, number>,
      };
    }

    const hourlyEvents: TidalEvent[] = [];
    const highEvents: TidalEvent[] = [];
    const lowEvents: TidalEvent[] = [];
    for (const event of yearlyData[dateStamp]) {
      if (event.type === "hourly") {
        hourlyEvents.push(event);
      } else if (event.type === "high") {
        highEvents.push(event);
      } else {
        lowEvents.push(event);
      }
    }

    const reverseIndex = createReverseIndex(hourlyEvents);

    return {
      hourlyEvents,
      extremityEvents: [...highEvents, ...lowEvents],
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
            <VerticalMarker />
            <RenderConditionally when={!!extremityEvents.length}>
              {extremityEvents.map((event) => (
                <HorizontalLevel key={event.timeStamp} {...event} />
              ))}
            </RenderConditionally>
          </PositionRelative>
        </RenderConditionally>
        <button
          role="button"
          onClick={() => setCurrentDate((s) => decrementDay(s))}
        >
          -
        </button>
        <button role="button" onClick={() => setCurrentDate(new Date())}>
          today
        </button>
        <button
          role="button"
          onClick={() => setCurrentDate((s) => incrementDay(s))}
        >
          +
        </button>
      </main>
    </>
  );
};
