import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { TideLevelWindow } from "./TideLevelWindow/TideLevelWindow";
import {
  LunarChart,
  TidalChart,
  fetchLunarData,
  fetchTidalData,
} from "../services/data-fetch";
import { useAppState } from "./useAppState";
import { DateButtonGroup } from "./TideLevelWindow/DateButtonGroup";
import { LunarPositionWindow } from "./LunarPositionWindow/LunarPositionWindow";

export function App() {
  const [tidalChart, setTidalChart] = useState<TidalChart | null>(null);
  const [lunarChart, setLunarChart] = useState<LunarChart | null>(null);

  const {
    dateStamp,
    isTodaySelected,
    decrementDate,
    incrementDate,
    setToToday,
  } = useAppState();

  useEffect(() => {
    fetchTidalData("./2023-shonanko.json", (chart) => {
      setTidalChart(chart);
    });
  }, []);

  useEffect(() => {
    fetchLunarData("./2023-shonanko-horizons-svs.json", (chart) => {
      setLunarChart(chart);
    });
  }, []);

  return (
    <>
      <h2>{dateStamp}</h2>
      {lunarChart ? (
        <LunarPositionWindow chart={lunarChart} dateStamp={dateStamp} />
      ) : (
        <div>loading...</div>
      )}
      {tidalChart ? (
        <TideLevelWindow
          tidalChart={tidalChart}
          dateStamp={dateStamp}
          isTodaySelected={isTodaySelected}
        />
      ) : (
        <div>loading...</div>
      )}
      <DateButtonGroup {...{ decrementDate, incrementDate, setToToday }} />
    </>
  );
}
