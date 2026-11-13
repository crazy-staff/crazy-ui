import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { kbdStyles } from './kbd.styles';

export interface KbdProps extends React.ComponentPropsWithRef<'kbd'>, VariantProps<typeof kbdStyles> {}

/** A keyboard key: `<Kbd>Ctrl</Kbd><Kbd>K</Kbd>`. */
export function Kbd({ className, size, ...props }: KbdProps) {
  return <kbd className={cn(kbdStyles({ size }), className)} {...props} />;
}

/** Keys pressed together, with a small gap. */
export function KbdGroup({ className, ...props }: React.ComponentPropsWithRef<'span'>) {
  return <span className={cn('inline-flex items-center gap-1', className)} {...props} />;
}
