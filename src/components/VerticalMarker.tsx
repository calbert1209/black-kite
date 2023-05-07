import { useEffect, useRef, useState } from "preact/hooks";
import "./VerticalMarker.css";

const percentOfMinutesPast = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const minutesPast = (hours * 60) + minutes;

  return minutesPast / 60 / 24 * 100;
}

export const VerticalMarker = () => {
  const [percent, setPercent] = useState(() => percentOfMinutesPast());
  const timer = useRef(-1);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      const nextPercent = percentOfMinutesPast();
      setPercent(nextPercent)
    }, 30000);

    return () => {
      window.clearInterval(timer.current);
    }
  }, [])

  return (
    <div className="vertical-marker_outer">
      <div className="vertical-marker_left" style={{ width: `${percent}%` }} />
      <div className="vertical-marker_right" />
    </div>
  );
};
