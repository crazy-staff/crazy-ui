import { Switch as BaseSwitch } from '@base-ui/react/switch';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { switchStyles } from './switch.styles';

export interface SwitchProps
  extends Omit<React.ComponentPropsWithRef<typeof BaseSwitch.Root>, 'className'>,
    VariantProps<typeof switchStyles> {
  /** Text next to the switch; the whole row becomes clickable. */
  label?: React.ReactNode;
  /** A muted line under the label. */
  description?: React.ReactNode;
  /** Classes for the row (or the switch, without a label), merged last. */
  className?: string;
  /** Override individual slot class names. */
  classNames?: { root?: string; thumb?: string; label?: string; description?: string };
}

/**
 * An on/off switch. The thumb glides with a spring ease (zeroed by reduced motion through the tokens).
 * With `label`, the switch sits at the end of a clickable row, like a settings list.
 */
export function Switch({ className, classNames, size, label, description, ...props }: SwitchProps) {
  const styles = switchStyles({ size });
  const control = (
    <BaseSwitch.Root className={cn(styles.root(), classNames?.root, !label && className)} {...props}>
      <BaseSwitch.Thumb className={cn(styles.thumb(), classNames?.thumb)} />
    </BaseSwitch.Root>
  );
  if (!label) return control;
  return (
    <label className={cn(styles.label(), classNames?.label, className)}>
      <span className={styles.text()}>
        {label}
        {description && <span className={cn(styles.description(), classNames?.description)}>{description}</span>}
      </span>
      {control}
    </label>
  );
}
