import { useEffect, useMemo, useState } from "preact/hooks";
import { TidalEvent, fetchSample } from "../services/data-fetch";
import { RenderConditionally } from "./RenderConditionally";
import { HorizontalLevel } from "./HorizontalLevel";
import { VerticalMarker } from "./VerticalMarker";

const today = new Date("2023-01-02T11:30:00.000+0900");

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
  const [hourlyEvents, setHourlyEvents] = useState<TidalEvent[]>([]);
  const [otherEvents, setOtherEvents] = useState<TidalEvent[]>([]);
  const [reverseIndex, setReverseIndex] = useState<Record<number, number>>({});

  const dateStamp = useMemo(() => createDateStamp(today), [today]);
  useEffect(() => {
    fetchSample((chart) => {
      const hourlyEvents: TidalEvent[] = [];
      const extremityEvents: TidalEvent[] = [];
      for (const event of chart[dateStamp]) {
        if (event.type === "hourly") {
          hourlyEvents.push(event);
        } else {
          extremityEvents.push(event);
        }
      }
      setHourlyEvents(hourlyEvents);
      setOtherEvents(extremityEvents);
      const index = createReverseIndex(hourlyEvents);
      setReverseIndex(index);
    });
  }, []);

  return (
    <>
      <h2>{dateStamp}</h2>
      <main>
        <RenderConditionally when={!!hourlyEvents.length}>
          <div style={{ position: "relative", paddingTop: "2em" }}>
            <ul
              style={{
                display: "flex",
                alignItems: "flex-end",
                paddingInlineStart: "0",
                gap: "1px",
                margin: 0,
              }}
            >
              {hourlyEvents.map((event) => (
                <li
                  key={event.timeStamp}
                  style={{
                    width: "20px",
                    height: `${event.level * 2}px`,
                    backgroundColor: colorRange[reverseIndex[event.level]],
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      fontSize: "0.5em",
                      color: "white",
                      opacity: 1,
                    }}
                  >
                    {event.level}
                  </div>
                </li>
              ))}
            </ul>
            <RenderConditionally when={!!otherEvents.length}>
              {otherEvents.map((event) => (
                <HorizontalLevel key={event.timeStamp} {...event} />
              ))}
            </RenderConditionally>
            <VerticalMarker />
          </div>
        </RenderConditionally>
      </main>
    </>
  );
};
