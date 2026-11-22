// WatcherForm — create/edit form: name, URL, polling interval, timeout, alert toggles.
// Shared by CreateWatcher and EditWatcher pages.
// Design only: fields are local form state for the UI. On submit it hands
// the values to `onSubmit` if one is given — it does NOT call the API.
// TODO (Bryan): wire onSubmit to createWatcher / updateWatcher.
import { useState } from 'react';
import type { FormEvent } from 'react';
import Button from '../ui/Button';
import IntervalPicker from './IntervalPicker';
import type { WatcherInput } from '../../types';

interface WatcherFormProps {
  initial?: Partial<WatcherInput>;
  submitLabel?: string;
  onSubmit?: (data: WatcherInput) => void;
  onCancel?: () => void;
}

export default function WatcherForm({
  initial = {},
  submitLabel = 'Save watcher',
  onSubmit,
  onCancel,
}: WatcherFormProps): React.JSX.Element {
  const [name, setName] = useState(initial.name ?? '');
  const [url, setUrl] = useState(initial.url ?? '');
  const [intervalSeconds, setIntervalSeconds] = useState(initial.interval_seconds ?? 60);
  const [timeoutSeconds, setTimeoutSeconds] = useState(initial.timeout_seconds ?? 10);
  const [isActive, setIsActive] = useState(initial.is_active ?? true);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    onSubmit?.({ name, url, interval_seconds: intervalSeconds, timeout_seconds: timeoutSeconds, is_active: isActive });
  };

  return (
    <form className="wm-form" onSubmit={handleSubmit}>
      <label className="wm-field">
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Bank API" required />
      </label>
      <label className="wm-field">
        URL
        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/health" required />
      </label>
      <IntervalPicker value={intervalSeconds} onChange={setIntervalSeconds} />
      <label className="wm-field">
        Timeout (seconds)
        <input type="number" min={1} value={timeoutSeconds} onChange={(e) => setTimeoutSeconds(Number(e.target.value))} />
      </label>
      <label className="wm-field-row">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        Active
      </label>
      <div className="wm-form-actions">
        <Button type="submit">{submitLabel}</Button>
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
