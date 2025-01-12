import "./DateButtonGroup.css";
import {
  ForwardIcon,
  BackIcon,
  JumpForwardIcon,
  JumpBackIcon,
  TodayIcon,
} from "../../assets/icons";

type Props = {
  decrementDate: () => void;
  incrementDate: () => void;
  setToToday: () => void;
  jumpBack: () => void;
  jumpForward: () => void;
};

export const DateButtonGroup = ({
  decrementDate,
  incrementDate,
  setToToday,
  jumpBack,
  jumpForward,
}: Props) => (
  <div className="date-button-group">
    <button role="button" onClick={jumpBack}>
      <JumpBackIcon />
    </button>
    <button role="button" onClick={decrementDate}>
      <BackIcon />
    </button>
    <button role="button" onClick={setToToday}>
      <TodayIcon />
    </button>
    <button role="button" onClick={incrementDate}>
      <ForwardIcon />
    </button>
    <button role="button" onClick={jumpForward}>
      <JumpForwardIcon />
    </button>
  </div>
);
