import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import isToday from "date-fns/isToday";
import format from "date-fns/format";
import compareAsc from "date-fns/compareAsc";
import isFirstDayOfMonth from "date-fns/isFirstDayOfMonth";
import setDate from "date-fns/setDate";
import addMonths from "date-fns/addMonths";

export const addDay = (date: Date) => addDays(date, 1);
export const subtractDay = (date: Date) => subDays(date, 1);

export const jumpToNextFirstDayOfMonth = (date: Date) => {
  const nextMonth = addMonths(date, 1);
  return setDate(nextMonth, 1);
};

export const jumpToPreviousFirstDayOfMonth = (date: Date) => {
  if (isFirstDayOfMonth(date)) {
    return addMonths(date, -1);
  }

  return setDate(date, 1);
};

export { isToday, format, compareAsc };
