// IntervalPicker — polling interval selector (e.g. 30s, 1m, 5m, 15m) used inside WatcherForm.
// Design only: a labelled select. The value lives with the caller.
interface IntervalPickerProps {
  value: number;
  onChange?: (seconds: number) => void;
  id?: string;
}

export const INTERVAL_OPTIONS = [
  { seconds: 30, label: '30 seconds' },
  { seconds: 60, label: '1 minute' },
  { seconds: 300, label: '5 minutes' },
  { seconds: 900, label: '15 minutes' },
];

export default function IntervalPicker({ value, onChange, id = 'interval' }: IntervalPickerProps): React.JSX.Element {
  return (
    <label className="wm-field" htmlFor={id}>
      Polling interval
      <select
        id={id}
        value={value}
        onChange={(event) => onChange?.(Number(event.target.value))}
      >
        {INTERVAL_OPTIONS.map((option) => (
          <option key={option.seconds} value={option.seconds}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
