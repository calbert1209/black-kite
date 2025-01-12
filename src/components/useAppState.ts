import { useCallback, useMemo, useState } from "preact/hooks";
import {
  addDay,
  format,
  isToday,
  jumpToNextFirstDayOfMonth,
  jumpToPreviousFirstDayOfMonth,
  subtractDay,
} from "../lib/dates";

export const useAppState = () => {
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

  const jumpBack = useCallback(
    () => setCurrentDate((s) => jumpToPreviousFirstDayOfMonth(s)),
    []
  );
  const jumpForward = useCallback(
    () => setCurrentDate((s) => jumpToNextFirstDayOfMonth(s)),
    []
  );

  return {
    currentDate,
    dateStamp,
    isTodaySelected,
    decrementDate,
    incrementDate,
    setToToday,
    jumpBack,
    jumpForward,
  };
};
