import * as React from 'react';
import { cn } from '../../lib/tv';
import { labelStyles } from './label.styles';

export interface LabelProps extends React.ComponentPropsWithRef<'label'> {
  /** Adds a required marker after the text. Put `required` on the control too. */
  required?: boolean;
  /** Dims the label to match a disabled control. */
  disabled?: boolean;
}

/** A label for a form control. Inside a `Field`, use `Field.Label` instead. */
export function Label({ className, required, disabled, children, ...props }: LabelProps) {
  return (
    <label data-disabled={disabled ? '' : undefined} className={cn(labelStyles().base(), className)} {...props}>
      {children}
      {required && <RequiredMark />}
    </label>
  );
}

/** The red asterisk after a required label. Hidden from screen readers: the control says it. */
export function RequiredMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn(labelStyles().required(), className)}>
      *
    </span>
  );
}
