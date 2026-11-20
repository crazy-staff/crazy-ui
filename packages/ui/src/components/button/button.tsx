import { Button as BaseButton } from '@base-ui/react/button';
import * as React from 'react';
import { useTouch } from '../../lib/responsive';
import { cn, type VariantProps } from '../../lib/tv';
import { buttonStyles } from './button.styles';

export interface ButtonProps
  extends React.ComponentPropsWithRef<typeof BaseButton>,
    VariantProps<typeof buttonStyles> {}

/**
 * The primary action control. Token-driven: radius, height, shadow and accent
 * all come from `--cui-*`, so an app restyles every button by overriding tokens. Inside a
 * `TouchProvider` it renders at touch size (`lg`, icon buttons `icon-lg`).
 */
export function Button({ className, variant, size, glow, ...props }: ButtonProps) {
  const touch = useTouch();
  const resolved = touch ? (size?.startsWith('icon') ? 'icon-lg' : 'lg') : size;
  return <BaseButton className={cn(buttonStyles({ variant, size: resolved, glow }), className)} {...props} />;
}
