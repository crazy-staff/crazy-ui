import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { Check, Minus } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { checkboxStyles } from './checkbox.styles';

const styles = checkboxStyles();

export interface CheckboxProps extends Omit<React.ComponentPropsWithRef<typeof BaseCheckbox.Root>, 'className'> {
  /** Text next to the box; the whole row becomes clickable. */
  label?: React.ReactNode;
  className?: string;
  classNames?: { root?: string; indicator?: string; label?: string };
}

/** A box to tick. `indeterminate` shows a dash. */
function CheckboxSimple({ label, className, classNames, indeterminate, ...props }: CheckboxProps) {
  const box = (
    <BaseCheckbox.Root
      indeterminate={indeterminate}
      className={cn(styles.root(), classNames?.root, !label && className)}
      {...props}
    >
      <BaseCheckbox.Indicator
        keepMounted
        className={cn(styles.indicator(), !indeterminate && 'data-[unchecked]:hidden', classNames?.indicator)}
      >
        {indeterminate ? <Minus /> : <Check />}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
  if (!label) return box;
  return (
    <label className={cn(styles.label(), classNames?.label, className)}>
      {box}
      {label}
    </label>
  );
}

export interface CheckboxGroupProps extends Omit<React.ComponentPropsWithRef<typeof BaseCheckboxGroup>, 'className'> {
  className?: string;
}

/** Several checkboxes sharing one array value. */
export function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return <BaseCheckboxGroup className={cn(styles.group(), className)} {...props} />;
}

export const Checkbox = Object.assign(CheckboxSimple, {
  Root: BaseCheckbox.Root,
  Indicator: BaseCheckbox.Indicator,
});
