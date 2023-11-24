type TidalEventType = "hourly" | "high" | "low";

export type TidalEvent = {
  timeStamp: string;
  level: number;
  type: TidalEventType;
};

export type TidalData = Record<string, TidalEvent[]>;

export const fetchTidalData = async (
  url: string,
  onFetch: (chart: TidalData) => void
) => {
  const resp = await window.fetch(url);
  const json: TidalData = await resp.json();
  onFetch(json);
};

export type LunarEvent = {
  azimuth: number;
  elevation: number;
  localDate: string;
  phi: number;
  utcDate: string;
  age?: number;
};

export type LunarChart = Record<string, LunarEvent[]>;

export const fetchLunarData = async (
  url: string,
  onFetch: (data: LunarChart) => void
) => {
  const resp = await window.fetch(url);
  const json: LunarChart = await resp.json();
  onFetch(json);
};
