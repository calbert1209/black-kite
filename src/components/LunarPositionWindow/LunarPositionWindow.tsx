import { LunarChart } from "../../services/data-fetch";
import { MoonIcon } from "../MoonIcon/MoonIcon";

const chartWidth = 503;
const barWidth = (chartWidth - 23 * 1) / 24;

type Props = {
  chart: LunarChart;
  dateStamp: string;
};
export const LunarPositionWindow = ({ chart, dateStamp }: Props) => {
  return (
    <svg
      viewBox={`0 0 ${chartWidth} 400`}
      width={chartWidth}
      xmlns="http://www.w3.org/2000/svg"
      fill="tomato"
    >
      <rect x="0" y="200" height="1" width={chartWidth} fill="lightgrey" />
      {chart[dateStamp].map(({ localDate, elevation, age }, index) => (
        <MoonIcon
          key={localDate}
          age={age ?? 0}
          x={index * (barWidth + 1)}
          y={200 - elevation * 2}
          disabled={elevation <= 0}
        />
      ))}
    </svg>
  );
};
