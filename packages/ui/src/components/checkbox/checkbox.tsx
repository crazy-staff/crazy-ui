import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { Check, Minus } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { checkboxStyles } from './checkbox.styles';

const styles = checkboxStyles();

type RootProps = Omit<React.ComponentPropsWithRef<typeof BaseCheckbox.Root>, 'className'> & { className?: string };

/** The box itself, without the label row. Renders a `<span role="checkbox">` and a hidden input. */
function CheckboxRoot({ className, ...props }: RootProps) {
  return <BaseCheckbox.Root className={cn(styles.root(), className)} {...props} />;
}

type IndicatorProps = Omit<React.ComponentPropsWithRef<typeof BaseCheckbox.Indicator>, 'className'> & {
  className?: string;
};

/** The tick (or the dash when indeterminate). Without children it draws the default icons. */
function CheckboxIndicator({ className, children, ...props }: IndicatorProps) {
  return (
    <BaseCheckbox.Indicator keepMounted className={cn(styles.indicator(), className)} {...props}>
      {children ?? (
        <>
          <Check className={styles.check()} />
          <Minus className={styles.dash()} />
        </>
      )}
    </BaseCheckbox.Indicator>
  );
}

export interface CheckboxProps extends RootProps {
  /** Text next to the box; the whole row becomes clickable. */
  label?: React.ReactNode;
  /** A muted line under the label. */
  description?: React.ReactNode;
  /** Classes for the row (or the box, without a label), merged last. */
  className?: string;
  /** Classes per slot. */
  classNames?: { root?: string; indicator?: string; label?: string; description?: string };
}

/** A box to tick. `indeterminate` (or a `parent` box in a group) shows a dash. */
function CheckboxSimple({ label, description, className, classNames, ...props }: CheckboxProps) {
  const box = (
    <CheckboxRoot className={cn(classNames?.root, !label && className)} {...props}>
      <CheckboxIndicator className={classNames?.indicator} />
    </CheckboxRoot>
  );
  if (!label) return box;
  return (
    <label className={cn(styles.label(), classNames?.label, className)}>
      {box}
      {description ? (
        <span className={styles.text()}>
          {label}
          <span className={cn(styles.description(), classNames?.description)}>{description}</span>
        </span>
      ) : (
        label
      )}
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
  Root: CheckboxRoot,
  Indicator: CheckboxIndicator,
});
