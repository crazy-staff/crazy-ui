import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { chipStyles } from './chip.styles';

export interface ChipProps extends React.ComponentPropsWithRef<'span'>, VariantProps<typeof chipStyles> {}

/** A small status label ("verified", "new", a tag). Smallest radius of the scale. */
export function Chip({ className, variant, size, ...props }: ChipProps) {
  return <span className={cn(chipStyles({ variant, size }), className)} {...props} />;
}
