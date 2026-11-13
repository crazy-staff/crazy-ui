import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { Toggle } from '../toggle/toggle';
import { toggleGroupStyles } from './toggle-group.styles';

export interface ToggleGroupItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  'aria-label'?: string;
}

export interface ToggleGroupProps
  extends Omit<React.ComponentPropsWithRef<typeof BaseToggleGroup>, 'className'>,
    VariantProps<typeof toggleGroupStyles> {
  /** Short form: the options. Or pass `<Toggle value="…">` children. */
  items?: ToggleGroupItem[];
  className?: string;
  classNames?: { root?: string; item?: string };
}

/**
 * A set of toggles in one frame — a segmented control when single, a toolbar when `multiple`.
 * The pressed item sits on the background colour, like the selected tab in a segmented control.
 */
export function ToggleGroup({ items, size, className, classNames, children, ...props }: ToggleGroupProps) {
  const styles = toggleGroupStyles({ size });
  const itemSize = size === 'sm' ? 'sm' : 'md';
  return (
    <BaseToggleGroup className={cn(styles.root(), classNames?.root, className)} {...props}>
      {items
        ? items.map((i) => (
            <Toggle
              key={i.value}
              value={i.value}
              disabled={i.disabled}
              aria-label={i['aria-label']}
              size={itemSize}
              className={cn(styles.item(), classNames?.item)}
            >
              {i.label}
            </Toggle>
          ))
        : children}
    </BaseToggleGroup>
  );
}

/** Style for `Toggle` children placed in a `ToggleGroup` by hand. */
export const toggleGroupItemClass = (size: 'sm' | 'md' = 'md') => toggleGroupStyles({ size }).item();
