import { TidalData } from "../../services/data-fetch";
import { RenderConditionally } from "../../ui/components/RenderConditionally";
import { TideLevelBarChart } from "./TideLevelBarChart";
import { useTideLevelWindowState } from "./useTideLevelWindowState";
import { PositionRelative } from "../../ui/components";
import { ExtremityEventList } from "./ExtremityEvent";
import "./TideLevelWindow.css";

type Props = {
  tidalData: TidalData;
  isTodaySelected: boolean;
  dateStamp: string;
};

export const TideLevelWindow = ({
  tidalData,
  isTodaySelected,
  dateStamp,
}: Props) => {
  const { hourlyEvents, reverseIndex, extremityEvents } =
    useTideLevelWindowState(tidalData, dateStamp);

  return (
    <main>
      <RenderConditionally when={!!hourlyEvents.length}>
        <div className="tide-level-window_flex-box">
          <PositionRelative>
            <TideLevelBarChart
              events={hourlyEvents}
              reverseIndex={reverseIndex}
              showTimeMarker={isTodaySelected}
            />
          </PositionRelative>
          <ExtremityEventList events={extremityEvents} />
        </div>
      </RenderConditionally>
    </main>
  );
};
