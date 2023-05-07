type TidalEventType = "hourly" | "high" | "low";

export type TidalEvent = {
  timeStamp: string;
  level: number;
  type: TidalEventType 
}

type TidalChart = Record<string, TidalEvent[]>

export const fetchSample = async (onFetch: (chart: TidalChart) => void) => {
  const resp = await window.fetch('./3-day-sample.json')
  const json: TidalChart = await resp.json();
  onFetch(json);
}