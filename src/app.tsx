import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { TideLevelWindow } from "./components/TideLevelWindow/TideLevelWindow";
import {
  LunarChart,
  TidalChart,
  fetchLunarData,
  fetchTidalData,
} from "./services/data-fetch";
import { LunarPositionWindow } from "./components/LunarPositionWindow/LunarPositionWindow";
import { format } from "./lib/dates";

export function App() {
  const [tidalChart, setTidalChart] = useState<TidalChart | null>(null);
  const [lunarChart, setLunarChart] = useState<LunarChart | null>(null);

  useEffect(() => {
    fetchTidalData("./2023-shonanko.json", (chart) => {
      setTidalChart(chart);
    });
  }, []);

  useEffect(() => {
    fetchLunarData("./2023-shonanko-horizons.json", (chart) => {
      setLunarChart(chart);
    });
  });

  return (
    <>
      {lunarChart ? (
        <LunarPositionWindow chart={lunarChart} />
      ) : (
        <div>loading...</div>
      )}
      {tidalChart ? (
        <TideLevelWindow tidalChart={tidalChart} />
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
