/// <reference types="vite-plugin-svgr/client" />
import { JSX } from "preact/jsx-runtime";
import forwardIcon from "./forward.svg?react";
import jumpForwardIcon from "./jump_forward.svg?react";
import todayIcon from "./today.svg?react";
import "./icons.css";

export const ForwardIcon = forwardIcon as () => JSX.Element;
export const BackIcon = () => (
  <div className="rotate-180">
    <ForwardIcon />
  </div>
);
export const JumpForwardIcon = jumpForwardIcon as () => JSX.Element;
export const JumpBackIcon = () => (
  <div className="rotate-180">
    <JumpForwardIcon />
  </div>
);
export const TodayIcon = todayIcon as () => JSX.Element;
