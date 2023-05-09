import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { TideLevelWindow } from "./components/TideLevelWindow/TideLevelWindow";
import { TidalChart, fetchData } from "./services/data-fetch";

export function App() {
  const [tidalChart, setTidalChart] = useState<TidalChart | null>(null);

  useEffect(() => {
    fetchData("./2023-shonanko.json", (chart) => {
      setTidalChart(chart);
    });
  }, []);

  if (!tidalChart) {
    return <div>loading...</div>;
  }

  return <TideLevelWindow tidalChart={tidalChart} />;
}
