import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { TideLevelWindow } from "./TideLevelWindow/TideLevelWindow";
import {
  LunarData,
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
  const [lunarData, setLunarData] = useState<LunarData | null>(null);

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
      setLunarData(chart);
    });
  }, []);

  return (
    <WindowSizeProvider>
      <h2>{dateStamp}</h2>
      <DateButtonGroup {...{ decrementDate, incrementDate, setToToday }} />
      {lunarData ? (
        <LunarPositionWindow lunarData={lunarData} dateStamp={dateStamp} />
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
