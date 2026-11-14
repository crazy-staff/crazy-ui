import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { toggleStyles } from './toggle.styles';

export interface ToggleProps
  extends Omit<React.ComponentPropsWithRef<typeof BaseToggle>, 'className'>,
    VariantProps<typeof toggleStyles> {
  className?: string;
}

/** A button that stays pressed (bold, show grid…). Pressed state uses the soft accent. */
export function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return <BaseToggle className={cn(toggleStyles({ variant, size }), className)} {...props} />;
}
