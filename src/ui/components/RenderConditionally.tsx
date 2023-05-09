import { ComponentChildren } from "preact";

type Props = {
  when: boolean;
  children: ComponentChildren;
};

export const RenderConditionally = ({ when, children }: Props) =>
  when ? <>{children}</> : null;
