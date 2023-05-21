import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { TideLevelWindow } from "./TideLevelWindow/TideLevelWindow";
import { TidalChart, fetchData } from "../services/data-fetch";
import { useAppState } from "./useAppState";

export function App() {
  const [tidalChart, setTidalChart] = useState<TidalChart | null>(null);

  const {
    dateStamp,
    isTodaySelected,
    decrementDate,
    incrementDate,
    setToToday,
  } = useAppState();

  useEffect(() => {
    fetchData("./2023-shonanko.json", (chart) => {
      setTidalChart(chart);
    });
  }, []);

  if (!tidalChart) {
    return <div>loading...</div>;
  }

  return (
    <TideLevelWindow
      tidalChart={tidalChart}
      {...{
        dateStamp,
        isTodaySelected,
        decrementDate,
        incrementDate,
        setToToday,
      }}
    />
  );
}
