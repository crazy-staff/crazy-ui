import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { textareaStyles } from './textarea.styles';

export interface TextareaProps extends React.ComponentPropsWithRef<'textarea'>, VariantProps<typeof textareaStyles> {}

/** A multi-line text field that grows with its content. No shadow (squircle polyfill rule). */
export function Textarea({ className, resize, ...props }: TextareaProps) {
  return <textarea className={cn(textareaStyles({ resize }), className)} {...props} />;
}
