import { TidalChart } from "../../services/data-fetch";
import { RenderConditionally } from "../../ui/components/RenderConditionally";
import { VerticalMarker } from "./../VerticalMarker";
import { TideLevelBarChart } from "./TideLevelBarChart";
import { useTideLevelWindowState } from "./useTideLevelWindowState";
import { Row, PositionRelative } from "../../ui/components";
import { ExtremityEventList } from "./ExtremityEvent";
import "./TideLevelWindow.css";

type Props = {
  tidalChart: TidalChart;
  isTodaySelected: boolean;
  dateStamp: string;
};

export const TideLevelWindow = ({
  tidalChart,
  isTodaySelected,
  dateStamp,
}: Props) => {
  const { hourlyEvents, reverseIndex, extremityEvents } =
    useTideLevelWindowState(tidalChart, dateStamp);

  return (
    <main>
      <RenderConditionally when={!!hourlyEvents.length}>
        <Row className="tide-level-window_row" gap={"32px"} align="flex-end">
          <PositionRelative>
            <TideLevelBarChart
              events={hourlyEvents}
              reverseIndex={reverseIndex}
              showTimeMarker={isTodaySelected}
            />
          </PositionRelative>
          <ExtremityEventList events={extremityEvents} />
        </Row>
      </RenderConditionally>
    </main>
  );
};
