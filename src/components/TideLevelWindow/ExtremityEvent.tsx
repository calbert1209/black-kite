import { TidalEvent } from "../../services/data-fetch";
import { Column, Row } from "../../ui/components";
import "./ExtremityEvent.css";

const ExtremityEvent = ({ type, level, timeStamp }: TidalEvent) => (
  <Column
    align="flex-start"
    className={
      type === "high" ? "extremity-event--high" : "extremity-event--low"
    }
  >
    <Row gap={"4px"}>
      <div>{type === "high" ? "▲" : "▼"}</div>
      <div>{level}</div>
    </Row>
    <div>{timeStamp.substring(11, 16)}</div>
  </Column>
);

type Props = {
  events: TidalEvent[];
};

export const ExtremityEventList = ({ events }: Props) => (
  <Column gap={"24px"} justify="flex-end">
    {events.map((event) => (
      <ExtremityEvent key={event.timeStamp} {...event} />
    ))}
  </Column>
);
