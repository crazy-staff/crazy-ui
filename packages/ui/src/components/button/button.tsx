import { Button as BaseButton } from '@base-ui/react/button';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { buttonStyles } from './button.styles';

export interface ButtonProps
  extends React.ComponentPropsWithRef<typeof BaseButton>,
    VariantProps<typeof buttonStyles> {}

/**
 * The primary action control. Token-driven: radius, height, shadow and accent
 * all come from `--cui-*`, so an app restyles every button by overriding tokens.
 */
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <BaseButton className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
