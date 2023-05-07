import { ComponentChildren } from "preact";
import "./TideLevelBarChart.css";

type LevelBarProps = {
  level: number;
  color: string;
};

export const TideLevelBar = ({ level, color }: LevelBarProps) => (
  <li
    className="tide-level-bar"
    style={{
      height: `${level * 2}px`,
      backgroundColor: color,
    }}
  >
    <div className="tide-level-bar_label">{level}</div>
  </li>
);

type ChartProps = {
  children: ComponentChildren;
};

export const TideLevelBarChart = ({ children }: ChartProps) => (
  <ul className="tide-level-bar-chart">{children}</ul>
);
