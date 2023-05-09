import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import isToday from "date-fns/isToday";
import format from "date-fns/format";
import compareAsc from "date-fns/compareAsc";

export const addDay = (date: Date) => addDays(date, 1);
export const subtractDay = (date: Date) => subDays(date, 1);

export { isToday, format, compareAsc };
