const term = 29.53;
const [narrow, mid, wide] = [4, 8, 14];
const commonCenter = { cx: "20", cy: "20" } as const;
const colors = {
  moonGrey: "#1b2b34",
  disabledGrey: "lightgrey",
  moonLight: "white",
};

const moonIconParameters = (age: number) => {
  const index = Math.floor(((age / term) * 16) % 16);
  // prettier-ignore
  const lightIris = [
    0, 0, 0, 0,
    0, narrow, mid, wide,
    0, wide, mid, narrow,
    0, 0, 0, 0,
  ][index];
  // prettier-ignore
  const darkIris = [
    narrow, wide, mid, narrow,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, narrow, mid, wide,
  ][index];
  const darkLeft = index < 8;
  const darkRight = index === 0 || index > 8;

  return {
    lightIris,
    darkIris,
    darkLeft,
    darkRight,
    index,
  };
};

type Props = {
  age: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  disabled?: boolean;
};

export const MoonIcon = ({
  age,
  x = 0,
  y = 0,
  width = 20,
  height = 20,
  disabled = false,
}: Props) => {
  const { lightIris, darkIris, darkLeft, darkRight } = moonIconParameters(age);
  const outlineColor = disabled ? colors.disabledGrey : colors.moonGrey;
  return (
    <svg
      className="mySvg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      x={x}
      y={y}
      width={width}
      height={height}
    >
      <g>
        <ellipse
          id="outlineBlack"
          {...commonCenter}
          rx="20"
          ry="20"
          fill={outlineColor}
        />
        <ellipse
          id="white"
          {...commonCenter}
          rx="18"
          ry="18"
          fill={colors.moonLight}
        />
        {darkLeft ? (
          <path id="darkLeft" d="M20,1 a10,10 0 0,0 0,38" fill={outlineColor} />
        ) : null}
        {darkRight ? (
          <path
            id="darkRight"
            d="M20,39 a10,10 0 0,0 0,-38"
            fill={outlineColor}
          />
        ) : null}
        <ellipse
          id="darkIris"
          {...commonCenter}
          rx={darkIris}
          ry="19"
          fill={outlineColor}
        />
        <ellipse
          id="lightIris"
          {...commonCenter}
          rx={lightIris}
          ry="18"
          fill={colors.moonLight}
        />
      </g>
    </svg>
  );
};
