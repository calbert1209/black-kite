import { useMemo, useState } from "preact/hooks";
import { LunarChart } from "../../services/data-fetch";
import { format } from "../../lib/dates";

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
      {chart[dateStamp].map(({ localDate, elevation }, index) => {
        const absValue = Math.abs(elevation * 2);
        return (
          <rect
            key={localDate}
            width={barWidth}
            height={absValue}
            x={index * (barWidth + 1)}
            y={elevation >= 0 ? 200 - absValue : 200}
          />
        );
      })}
    </svg>
  );
};
