import { ComponentChildren } from "preact";
import "./TideLevelBarChart.css";

const kScaleY = 2;

type LevelBarProps = {
  level: number;
  color: string;
};

export const TideLevelBar = ({ level, color }: LevelBarProps) => {
  const height = Math.abs(level);
  const shift = Math.min(0, level);
  return (
    <li
      className="tide-level-bar"
      style={{
        height: `${height * kScaleY}px`,
        backgroundColor: color,
        transform: `translateY(${shift * kScaleY * -1}px)`
      }}
    >
      <div className="tide-level-bar_label">{level}</div>
    </li>
  );
}

type ChartProps = {
  children: ComponentChildren;
};

export const TideLevelBarChart = ({ children }: ChartProps) => (
  <ul className="tide-level-bar-chart">{children}</ul>
);
