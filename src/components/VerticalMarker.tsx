
export const VerticalMarker = () => {
  const [hours, minutes] = [11, 30];
  const timeInMinutes = (hours * 60) + minutes;

  const percent = timeInMinutes / 60 / 24 * 100;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
      }}
    >
      <div
        style={{
          height:'100%',
          width: `${percent}%`,
          borderRight: '1px solid red',
        }}
      />
      <div
        style={{
          height:'100%',
          flexGrow: 1,
        }}
      />
    </div>
  );
};
