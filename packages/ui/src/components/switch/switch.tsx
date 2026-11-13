import { Switch as BaseSwitch } from '@base-ui/react/switch';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { switchStyles } from './switch.styles';

export interface SwitchProps
  extends React.ComponentPropsWithRef<typeof BaseSwitch.Root>,
    VariantProps<typeof switchStyles> {
  /** Override individual slot class names (`root`, `thumb`). */
  classNames?: { root?: string; thumb?: string };
}

/** A toggle. The thumb glides with a spring ease; respects reduced motion via tokens. */
export function Switch({ className, classNames, size, ...props }: SwitchProps) {
  const styles = switchStyles({ size });
  return (
    <BaseSwitch.Root className={cn(styles.root(), classNames?.root, className)} {...props}>
      <BaseSwitch.Thumb className={cn(styles.thumb(), classNames?.thumb)} />
    </BaseSwitch.Root>
  );
}
