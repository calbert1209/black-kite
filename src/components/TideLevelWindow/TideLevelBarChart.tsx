import { TidalEvent } from "../../services/data-fetch";
import { colorRange } from "../../ui";

const kScaleY = 2;

type Props = {
  events: TidalEvent[];
  reverseIndex: Record<number, number>;
};

export const TideLevelBarChart = ({ events, reverseIndex }: Props) => {
  const chartWidth = Math.min(window.innerWidth * 0.8, 504);
  const barWidth = (chartWidth - 23 * 1) / 24;

  return (
    <svg
      viewBox={`0 0 ${chartWidth} 300`}
      xmlns="http://www.w3.org/2000/svg"
      width={chartWidth}
    >
      {events.map(({ level, timeStamp }, i) => (
        <rect
          key={timeStamp}
          x={i * (barWidth + 1)}
          y={level >= 0 ? 250 - level * kScaleY : 250}
          width={barWidth}
          height={Math.abs(level * kScaleY)}
          fill={colorRange[reverseIndex[level]]}
        />
      ))}
    </svg>
  );
};
