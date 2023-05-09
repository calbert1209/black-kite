import { useEffect, useState } from "preact/hooks";
import { TidalChart, fetchData } from "../../services/data-fetch";
import { RenderConditionally } from "./../RenderConditionally";
import { HorizontalLevel } from "./../HorizontalLevel";
import { VerticalMarker } from "./../VerticalMarker";
import { TideLevelBar, TideLevelBarChart } from "./TideLevelBarChart";
import { PositionRelative } from "./../PositionRelative";
import { colorRange } from "../../ui";
import { useTideLevelWindowState } from "./useTideLevelWindowState";

export const TideLevelWindow = () => {
  const [yearlyData, setYearlyData] = useState<TidalChart | null>(null);

  useEffect(() => {
    fetchData("./2023-shonanko.json", (chart) => {
      setYearlyData(chart);
    });
  }, []);

  const {
    dateStamp,
    hourlyEvents,
    highEvents,
    lowEvents,
    reverseIndex,
    isTodaySelected,
    decrementDate,
    incrementDate,
    setToToday,
  } = useTideLevelWindowState(yearlyData);

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
            <RenderConditionally when={isTodaySelected}>
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
