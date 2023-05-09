import { TidalChart } from "../../services/data-fetch";
import { RenderConditionally } from "../../ui/components/RenderConditionally";
import { VerticalMarker } from "./../VerticalMarker";
import { TideLevelBar, TideLevelBarChart } from "./TideLevelBarChart";
import { colorRange } from "../../ui";
import { useTideLevelWindowState } from "./useTideLevelWindowState";
import { Row, PositionRelative, Column } from "../../ui/components";

type Props = {
  tidalChart: TidalChart;
};

export const TideLevelWindow = ({ tidalChart }: Props) => {
  const {
    dateStamp,
    hourlyEvents,
    reverseIndex,
    isTodaySelected,
    extremityEvents,
    decrementDate,
    incrementDate,
    setToToday,
  } = useTideLevelWindowState(tidalChart);

  return (
    <>
      <h2>{dateStamp}</h2>
      <main>
        <RenderConditionally when={!!hourlyEvents.length}>
          <Row gap={"24px"}>
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
            </PositionRelative>
            <Column gap={"8px"} justify="space-between">
              {extremityEvents.map((event) => (
                <Column align="flex-start">
                  <Row gap={"4px"}>
                    <div>{event.type === "high" ? "▲" : "▼"}</div>
                    <div>{event.level}</div>
                  </Row>
                  <div>{event.timeStamp.substring(11, 16)}</div>
                </Column>
              ))}
            </Column>
          </Row>
        </RenderConditionally>
        <button role="button" onClick={decrementDate}>
          &lt;
        </button>
        <button role="button" onClick={setToToday}>
          today
        </button>
        <button role="button" onClick={incrementDate}>
          &gt;
        </button>
      </main>
    </>
  );
};
