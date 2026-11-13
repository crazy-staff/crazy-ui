import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { spinnerStyles } from './spinner.styles';

export interface SpinnerProps extends React.ComponentPropsWithRef<'svg'>, VariantProps<typeof spinnerStyles> {
  /** Read by screen readers. @default 'Loading' */
  label?: string;
}

/** An indeterminate loading indicator. Slows down (but keeps turning) with reduced motion. */
export function Spinner({ className, size, tone, label = 'Loading', ...props }: SpinnerProps) {
  const s = spinnerStyles({ size, tone });
  return (
    <svg viewBox="0 0 24 24" fill="none" role="status" aria-label={label} className={cn(s.root(), className)} {...props}>
      <circle cx="12" cy="12" r="9.5" strokeWidth="3" className={s.track()} />
      <path d="M21.5 12a9.5 9.5 0 0 0-9.5-9.5" strokeWidth="3" strokeLinecap="round" className={s.arc()} />
    </svg>
  );
}
