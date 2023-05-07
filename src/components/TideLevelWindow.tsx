import { useEffect, useMemo, useState } from "preact/hooks";
import { TidalEvent, fetchSample } from "../services/data-fetch";

const today = new Date("2023-01-02T11:30:00.000+0900");

const leadingZeros = (n: number | string, digits: number) => {
  return `${n}`.padStart(digits, "0");
};

const createDateStamp = (d: Date) => {
  const year = d.getFullYear();
  const month = leadingZeros(d.getMonth() + 1, 2);
  const date = leadingZeros(d.getDate(), 2);
  return [year, month, date].join("-");
};

export const TideLevelWindow = () => {
  const [events, setEvents] = useState<TidalEvent[]>([])

  const dateStamp = useMemo(() => createDateStamp(today), [today])
  useEffect(() => {
    fetchSample((chart) => setEvents(chart[dateStamp]))
  }, []);

  return (
    <>
      <h1>{dateStamp}</h1>
      <div>
      {events.length ? (
        <ul>
          {events.map(event => (
            <li key={event.timeStamp}>{event.timeStamp}</li>
          ))}
        </ul>
      ) : null}
      </div>
    </>
  );
};
