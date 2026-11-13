import { Input as BaseInput } from '@base-ui/react/input';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { inputStyles } from './input.styles';

export interface InputProps
  extends Omit<React.ComponentPropsWithRef<typeof BaseInput>, 'size'>,
    VariantProps<typeof inputStyles> {}

/** A single-line text field. Works standalone or inside a Base UI `Field`. */
export function Input({ className, size, ...props }: InputProps) {
  return <BaseInput className={cn(inputStyles({ size }), className)} {...props} />;
}
