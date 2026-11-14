import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { buttonGroupStyles } from './button-group.styles';

export interface ButtonGroupProps extends React.ComponentPropsWithRef<'div'>, VariantProps<typeof buttonGroupStyles> {}

/** Buttons joined into one control: `<ButtonGroup><Button variant="outline">…</Button>…</ButtonGroup>`. */
export function ButtonGroup({ className, orientation, ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-orientation={orientation ?? 'horizontal'}
      className={cn(buttonGroupStyles({ orientation }), className)}
      {...props}
    />
  );
}
