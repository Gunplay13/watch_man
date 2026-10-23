// EmptyState — placeholder for empty lists, e.g. "No watchers yet — create your first one."
// Design only: `action` is whatever button/link the page wants to show.
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  message?: string;
  action?: ReactNode;
}

export default function EmptyState({ title, message, action }: EmptyStateProps): React.JSX.Element {
  return (
    <div className="wm-card wm-empty">
      <h3>{title}</h3>
      {message ? <p style={{ margin: '0 0 16px' }}>{message}</p> : null}
      {action}
    </div>
  );
}
