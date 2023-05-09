import { ComponentChildren } from "preact"

type Props = {
  children: ComponentChildren;
}

export const PositionRelative = ({children}: Props) => (
  <div style={{ position: "relative"}}>{children}</div>
) 