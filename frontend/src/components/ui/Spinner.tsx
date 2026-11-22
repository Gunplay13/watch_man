// Spinner — loading indicator. Design only: size in px, optional label.
interface SpinnerProps {
  size?: number;
  label?: string;
}

export default function Spinner({ size = 28, label }: SpinnerProps): React.JSX.Element {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }} role="status" aria-label={label ?? 'Loading'}>
      <span className="wm-spinner" style={{ width: size, height: size }} />
      {label ? <span className="wm-muted">{label}</span> : null}
    </span>
  );
}
