import * as React from 'react';
import { cn } from '../../lib/tv';
import { labelStyles } from './label.styles';

export interface LabelProps extends React.ComponentPropsWithRef<'label'> {}

/** A label for a form control. Inside a `Field`, use `Field.Label` instead. */
export function Label({ className, ...props }: LabelProps) {
  return <label className={cn(labelStyles(), className)} {...props} />;
}
