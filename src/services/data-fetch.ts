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

export type LunarData = Record<string, LunarEvent[]>;

export const fetchLunarData = async (
  url: string,
  onFetch: (data: LunarData) => void
) => {
  const resp = await window.fetch(url);
  const json: LunarData = await resp.json();
  onFetch(json);
};
