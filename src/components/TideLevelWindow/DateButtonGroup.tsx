import "./DateButtonGroup.css";

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
      &lt;&lt;
    </button>
    <button role="button" onClick={decrementDate}>
      &lt;
    </button>
    <button role="button" onClick={setToToday}>
      today
    </button>
    <button role="button" onClick={incrementDate}>
      &gt;
    </button>
    <button role="button" onClick={jumpForward}>
      &gt;&gt;
    </button>
  </div>
);
