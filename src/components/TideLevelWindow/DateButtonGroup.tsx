import "./DateButtonGroup.css";

type Props = {
  decrementDate: () => void;
  incrementDate: () => void;
  setToToday: () => void;
};

export const DateButtonGroup = ({
  decrementDate,
  incrementDate,
  setToToday,
}: Props) => (
  <div className='date-button-group'>
    <button role="button" onClick={decrementDate}>
      &lt;
    </button>
    <button role="button" onClick={setToToday}>
      today
    </button>
    <button role="button" onClick={incrementDate}>
      &gt;
    </button>
  </div>
);
