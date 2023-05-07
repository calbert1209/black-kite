import { useMemo } from "preact/hooks";
import { TidalEvent } from "../services/data-fetch";

type Props = TidalEvent;

const getTimeMark = (isoDateString: string) => {
  const [_, timePart] = isoDateString.split('T');
  return timePart.substring(0, 5);
}

export const HorizontalLevel = ({ level, type, timeStamp }: Props) => {
  const color = type === 'high' ? 'mediumblue' : 'green';
  const timeMark = useMemo(() => getTimeMark(timeStamp), [timeStamp]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          flexGrow: 1,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          color: `${color}`,
          fontSize: "0.8em",
          lineHeight: `1em`,
        }}
      >
        <div
          style={{
            flexGrow: 1,
            height: "1em",
            borderBottom: `1px dotted ${color}`,
          }}
        />
        <div style={{ marginLeft: "4px", textShadow: '0 0 2px white' }}>{level} cm</div>
        <div style={{ marginLeft: "4px", textShadow: '0 0 2px white' }}>{timeMark}</div>
      </div>
      <div
        style={{
          width: "100%",
          height: `${level * 2}px`,
        }}
      />
    </div>
  );
};
