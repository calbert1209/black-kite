type TidalEventType = "hourly" | "high" | "low";

export type TidalEvent = {
  timeStamp: string;
  level: number;
  type: TidalEventType 
}

export type TidalChart = Record<string, TidalEvent[]>

export const fetchData = async (url: string, onFetch: (chart: TidalChart) => void) => {
  const resp = await window.fetch(url)
  const json: TidalChart = await resp.json();
  onFetch(json);
}