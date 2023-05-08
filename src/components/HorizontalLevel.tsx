import { useMemo } from "preact/hooks";
import { TidalEvent } from "../services/data-fetch";
import "./HorizontalLevel.css";

type Props = TidalEvent & {
  reversed?: boolean;
};

const getTimeMark = (isoDateString: string) => {
  const [_, timePart] = isoDateString.split("T");
  return timePart.substring(0, 5);
};

export const HorizontalLevel = ({
  level,
  type,
  timeStamp,
  reversed = false,
}: Props) => {
  const color = type === "high" ? "mediumblue" : "green";
  const timeMark = useMemo(() => getTimeMark(timeStamp), [timeStamp]);

  return (
    <div className="horizontal-level_outer">
      <div className="horizontal-level_upper" />
      <div
        className="horizontal-level_middle"
        style={{ color: `${color}` }}
        data-reversed={reversed}
      >
        <div
          className="horizontal-level_middle_line"
          style={{ borderBottomColor: color }}
        />
        <div className="horizontal-level_label">{level} cm</div>
        <div className="horizontal-level_label">{timeMark}</div>
      </div>
      <div
        className="horizontal-level_lower"
        style={{ height: `${level * 2}px` }}
      />
    </div>
  );
};
