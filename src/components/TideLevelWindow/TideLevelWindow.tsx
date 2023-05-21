import { TidalChart } from "../../services/data-fetch";
import { RenderConditionally } from "../../ui/components/RenderConditionally";
import { VerticalMarker } from "./../VerticalMarker";
import { TideLevelBar, TideLevelBarChart } from "./TideLevelBarChart";
import { colorRange } from "../../ui";
import { useTideLevelWindowState } from "./useTideLevelWindowState";
import { Row, PositionRelative } from "../../ui/components";
import { ExtremityEventList } from "./ExtremityEvent";
import { DateButtonGroup } from "./DateButtonGroup";
import "./TideLevelWindow.css";

type Props = {
  tidalChart: TidalChart;
  isTodaySelected: boolean;
  decrementDate: () => void;
  incrementDate: () => void;
  setToToday: () => void;
  dateStamp: string;
};

export const TideLevelWindow = ({
  tidalChart,
  isTodaySelected,
  decrementDate,
  incrementDate,
  setToToday,
  dateStamp,
}: Props) => {
  const { hourlyEvents, reverseIndex, extremityEvents } =
    useTideLevelWindowState(tidalChart, dateStamp);

  return (
    <>
      <h2>{dateStamp}</h2>
      <main>
        <RenderConditionally when={!!hourlyEvents.length}>
          <Row className="tide-level-window_row" gap={"32px"} align="flex-end">
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
            <ExtremityEventList events={extremityEvents} />
          </Row>
        </RenderConditionally>
        <DateButtonGroup {...{ decrementDate, incrementDate, setToToday }} />
      </main>
    </>
  );
};
