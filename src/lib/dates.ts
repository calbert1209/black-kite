import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays'

export const incrementDay = (date: Date) => addDays(date, 1);
export const decrementDay = (date: Date) => subDays(date, 1);