import { useEffect, useRef, useState } from "preact/hooks";
import { TidalEvent } from "../../services/data-fetch";
import { colorRange } from "../../ui";
import { RenderConditionally } from "../../ui/components";

const kScaleY = 2;
const kVerticalOffset = 350;

const percentOfMinutesPast = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const minutesPast = hours * 60 + minutes;

  return (minutesPast / 60 / 24) * 100;
};

const TimeMarker = () => {
  const [percent, setPercent] = useState(() => percentOfMinutesPast());
  const timer = useRef(-1);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      const nextPercent = percentOfMinutesPast();
      setPercent(nextPercent);
    }, 30000);

    return () => {
      window.clearInterval(timer.current);
    };
  }, []);

  return (
    <rect
      x={`${percent}%`}
      y="0"
      width="1"
      height={kVerticalOffset}
      fill="red"
    />
  );
};

type ChartProps = {
  events: TidalEvent[];
  reverseIndex: Record<number, number>;
  showTimeMarker?: boolean;
};

export const TideLevelBarChart = ({
  events,
  reverseIndex,
  showTimeMarker = false,
}: ChartProps) => {
  const chartWidth = Math.min(window.innerWidth * 0.8, 504);
  const barWidth = (chartWidth - 23 * 1) / 24;

  return (
    <svg
      viewBox={`0 0 ${chartWidth} 400`}
      xmlns="http://www.w3.org/2000/svg"
      width={chartWidth}
    >
      {events.map(({ level, timeStamp }, i) => (
        <rect
          key={timeStamp}
          x={i * (barWidth + 1)}
          y={level >= 0 ? kVerticalOffset - level * kScaleY : kVerticalOffset}
          width={barWidth}
          height={Math.abs(level * kScaleY)}
          fill={colorRange[reverseIndex[level]]}
        />
      ))}
      <RenderConditionally when={showTimeMarker}>
        <TimeMarker />
      </RenderConditionally>
    </svg>
  );
};
