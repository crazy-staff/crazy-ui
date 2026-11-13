import { Separator as BaseSeparator } from '@base-ui/react/separator';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { separatorStyles } from './separator.styles';

export interface SeparatorProps extends React.ComponentPropsWithRef<typeof BaseSeparator> {
  /** Text in the middle of a horizontal line ("or", a date…). */
  label?: React.ReactNode;
  classNames?: { line?: string };
}

/** A thin line between content, optionally with a label in the middle. */
export function Separator({ className, classNames, orientation = 'horizontal', label, ...props }: SeparatorProps) {
  const s = separatorStyles({ orientation });
  if (label && orientation === 'horizontal') {
    return (
      <div className={cn(s.labelled(), className)}>
        <BaseSeparator orientation="horizontal" className={cn(s.line(), classNames?.line)} {...props} />
        <span>{label}</span>
        <BaseSeparator orientation="horizontal" className={cn(s.line(), classNames?.line)} />
      </div>
    );
  }
  return <BaseSeparator orientation={orientation} className={cn(s.root(), className)} {...props} />;
}
