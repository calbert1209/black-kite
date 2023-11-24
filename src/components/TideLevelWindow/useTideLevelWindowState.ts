import { useMemo } from "preact/hooks";
import { collateDailyTidalEvents } from "../../models/TidalEvent/helpers";
import { TidalData } from "../../services/data-fetch";

export const useTideLevelWindowState = (
  tidalData: TidalData,
  dateStamp: string
) => {
  const { hourlyEvents, highEvents, lowEvents, reverseIndex, extremityEvents } =
    useMemo(
      () => collateDailyTidalEvents(tidalData[dateStamp]),
      [tidalData, dateStamp]
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
