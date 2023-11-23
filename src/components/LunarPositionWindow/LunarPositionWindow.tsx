import { useHourlyChartDimensions } from "../../providers/WindowSizeProvider";
import { LunarChart } from "../../services/data-fetch";
import { MoonIcon } from "../MoonIcon/MoonIcon";

type Props = {
  chart: LunarChart;
  dateStamp: string;
};
export const LunarPositionWindow = ({ chart, dateStamp }: Props) => {
  const { scaleY, chartHeight, chartWidth, barWidth } =
    useHourlyChartDimensions();

  const midpoint = chartHeight / 2;
  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      width={chartWidth}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y={midpoint} height="1" width={chartWidth} fill="lightgrey" />
      {chart[dateStamp].map(({ localDate, elevation, age }, index) => (
        <MoonIcon
          key={localDate}
          age={age ?? 0}
          x={index * (barWidth + 1)}
          y={midpoint - elevation * scaleY}
          width={barWidth}
          height={barWidth}
          disabled={elevation <= 0}
        />
      ))}
    </svg>
  );
};
