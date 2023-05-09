import { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
  justify?: "center" | "flex-end" | "flex-start" | "space-between" | "space-around";
  align?: "center" | "flex-end" | "flex-start";
  gap?: string | number;
  className?: string;
};

export const Row = ({
  children,
  gap,
  className,
  justify = "center",
  align = "center",
}: Props) => (
  <div
    className={className}
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: justify,
      alignItems: align,
      gap: gap ?? 0,
    }}
  >
    {children}
  </div>
);

export const Column = ({
  children,
  gap,
  className,
  justify = "center",
  align = "center",
}: Props) => (
  <div
    className={className}
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: justify,
      alignItems: align,
      gap: gap ?? 0,
    }}
  >
    {children}
  </div>
);
