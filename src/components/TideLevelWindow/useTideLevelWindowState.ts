import { useMemo } from "preact/hooks";
import { collateDailyTidalEvents } from "../../models/TidalEvent/helpers";
import { TidalChart } from "../../services/data-fetch";

export const useTideLevelWindowState = (
  tidalChart: TidalChart,
  dateStamp: string
) => {
  const { hourlyEvents, highEvents, lowEvents, reverseIndex, extremityEvents } =
    useMemo(
      () => collateDailyTidalEvents(tidalChart[dateStamp]),
      [tidalChart, dateStamp]
    );

  return {
    dateStamp,
    hourlyEvents,
    highEvents,
    lowEvents,
    extremityEvents,
    reverseIndex,
  };
};
