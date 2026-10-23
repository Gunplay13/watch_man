// Button — shared button styles/variants. Design only:
// visual variant + size, nothing else. No API calls, no navigation.
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'destructive' | 'ghost';
export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'default',
  children,
  className = '',
  ...props
}: ButtonProps): React.JSX.Element {
  const variantClass = variant === 'primary' ? '' : `wm-btn--${variant}`;
  const sizeClass = size === 'default' ? '' : `wm-btn--${size}`;
  return (
    <button type="button" className={`wm-btn ${variantClass} ${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
