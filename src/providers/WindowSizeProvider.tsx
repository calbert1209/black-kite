import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useMemo, useState } from "preact/hooks";

const getWindowSize = (target: Window) => ({
  width: target.innerWidth,
  height: target.innerHeight,
});

const WindowSizeContext = createContext<Size | null>(null);

export type Size = {
  width: number;
  height: number;
};

type Props = {
  children: ComponentChildren;
};

export const WindowSizeProvider = ({ children }: Props) => {
  const [size, setSize] = useState<Size | null>(() => getWindowSize(window));

  useEffect(() => {
    const resizeEventName = "resize";
    const onResize = ({ target }: UIEvent) => {
      if (target instanceof Window) {
        const nextSize = getWindowSize(target);
        setSize(nextSize);
      }
    };

    window.addEventListener(resizeEventName, onResize);

    return () => window.removeEventListener(resizeEventName, onResize);
  }, []);

  return (
    <WindowSizeContext.Provider value={size}>
      {children}
    </WindowSizeContext.Provider>
  );
};

const useWindowSize = (): Size => {
  const context = useContext(WindowSizeContext);

  if (!context) {
    throw new Error("useWindowSize requires WindowSizeContext");
  }

  return context;
};

const getChartDimensions = (target: Size) => {
  const scaleY = target.height > 800 ? 1.5 : 1;
  const chartHeight = scaleY * 200;
  const chartWidth = Math.min(target.width * 0.8, 504);
  const barWidth = (chartWidth - 23 * 1) / 24;

  return {
    scaleY,
    chartHeight,
    chartWidth,
    barWidth,
  };
};

export const useHourlyChartDimensions = () => {
  const size = useWindowSize();

  const dimensions = useMemo(() => {
    console.debug(`${useHourlyChartDimensions.name} recalculated`);
    return getChartDimensions(size);
  }, [size.width, size.height]);

  return dimensions;
};
