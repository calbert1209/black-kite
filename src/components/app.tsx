import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { TideLevelWindow } from "./TideLevelWindow/TideLevelWindow";
import {
  LunarChart,
  TidalData,
  fetchLunarData,
  fetchTidalData,
} from "../services/data-fetch";
import { useAppState } from "./useAppState";
import { DateButtonGroup } from "./TideLevelWindow/DateButtonGroup";
import { LunarPositionWindow } from "./LunarPositionWindow/LunarPositionWindow";
import { WindowSizeProvider } from "../providers/WindowSizeProvider";

export function App() {
  const [tidalData, setTidalData] = useState<TidalData | null>(null);
  const [lunarChart, setLunarChart] = useState<LunarChart | null>(null);

  const {
    dateStamp,
    isTodaySelected,
    decrementDate,
    incrementDate,
    setToToday,
  } = useAppState();

  useEffect(() => {
    fetchTidalData("./2023-tidal-data.json", (data) => {
      setTidalData(data);
    });
  }, []);

  useEffect(() => {
    fetchLunarData("./2023-lunar-data.json", (chart) => {
      setLunarChart(chart);
    });
  }, []);

  return (
    <WindowSizeProvider>
      <h2>{dateStamp}</h2>
      <DateButtonGroup {...{ decrementDate, incrementDate, setToToday }} />
      {lunarChart ? (
        <LunarPositionWindow chart={lunarChart} dateStamp={dateStamp} />
      ) : (
        <div>loading...</div>
      )}
      {tidalData ? (
        <TideLevelWindow
          tidalData={tidalData}
          dateStamp={dateStamp}
          isTodaySelected={isTodaySelected}
        />
      ) : (
        <div>loading...</div>
      )}
    </WindowSizeProvider>
  );
}
