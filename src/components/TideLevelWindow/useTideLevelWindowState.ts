import { useCallback, useMemo, useState } from "preact/hooks";
import { addDay, isToday, subtractDay, format } from "../../lib/dates";
import { collateDailyTidalEvents } from "../../models/TidalEvent/helpers";
import { TidalChart } from "../../services/data-fetch";

export const useTideLevelWindowState = (tidalChart: TidalChart) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const dateStamp = useMemo(
    () => format(currentDate, "yyyy-MM-dd"),
    [currentDate]
  );
  const isTodaySelected = useMemo(() => isToday(currentDate), [currentDate]);

  const decrementDate = useCallback(
    () => setCurrentDate((s) => subtractDay(s)),
    []
  );
  const incrementDate = useCallback(() => setCurrentDate((s) => addDay(s)), []);
  const setToToday = useCallback(() => setCurrentDate(new Date()), []);

  const { hourlyEvents, highEvents, lowEvents, reverseIndex, extremityEvents } = useMemo(
    () => collateDailyTidalEvents(tidalChart[dateStamp]),
    [tidalChart, currentDate]
  );

  return {
    dateStamp,
    hourlyEvents,
    highEvents,
    lowEvents,
    extremityEvents,
    reverseIndex,
    isTodaySelected,
    decrementDate,
    incrementDate,
    setToToday,
  };
};
