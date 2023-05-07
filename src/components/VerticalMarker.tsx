import "./VerticalMarker.css";

export const VerticalMarker = () => {
  const [hours, minutes] = [11, 30];
  const timeInMinutes = hours * 60 + minutes;

  const percent = (timeInMinutes / 60 / 24) * 100;

  return (
    <div className="vertical-marker_outer">
      <div className="vertical-marker_left" style={{ width: `${percent}%` }} />
      <div className="vertical-marker_right" />
    </div>
  );
};
