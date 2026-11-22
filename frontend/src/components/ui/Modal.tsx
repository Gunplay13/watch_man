// Modal — generic modal (confirm delete, etc.). Design only:
// renders when `open` is true; closing is the caller's decision via onClose.
import type { ReactNode } from 'react';
import Button from './Button';

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose?: () => void;
  footer?: ReactNode;
}

export default function Modal({ open, title, children, onClose, footer }: ModalProps): React.JSX.Element | null {
  if (!open) return null;
  return (
    <div className="wm-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="wm-modal">
        <div className="wm-modal-head">
          <h2>{title}</h2>
          {onClose ? (
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
              ×
            </Button>
          ) : null}
        </div>
        <div>{children}</div>
        {footer ? <div className="wm-form-actions" style={{ marginTop: 16 }}>{footer}</div> : null}
      </div>
    </div>
  );
}
