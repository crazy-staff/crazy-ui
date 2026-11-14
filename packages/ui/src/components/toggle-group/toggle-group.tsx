import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { glideBlockClass, useGlide } from '../sidebar/glide';
import { toggleGroupStyles } from './toggle-group.styles';

type Styles = VariantProps<typeof toggleGroupStyles>;

interface GroupContextValue {
  id: string;
  multiple: boolean;
  size: Styles['size'];
  variant: Styles['variant'];
  iconOnly: boolean;
  classNames?: { item?: string; indicator?: string };
}

const GroupContext = React.createContext<GroupContextValue | null>(null);

const glide = { type: 'spring', stiffness: 520, damping: 42 } as const;
const fade = { duration: 0.15 } as const;

export interface ToggleGroupItemProps extends Omit<BaseToggle.Props<string>, 'className' | 'render'> {
  /** The value this item adds to the group's value when pressed. */
  value: string;
  className?: string;
}

/** One toggle in a `ToggleGroup`. Renders a `<button>` with `aria-pressed`. */
function ToggleGroupItem({ className, children, ...props }: ToggleGroupItemProps) {
  const ctx = React.useContext(GroupContext);
  const reduce = useReducedMotion();
  const styles = toggleGroupStyles({ size: ctx?.size, variant: ctx?.variant, iconOnly: ctx?.iconOnly });
  return (
    <BaseToggle
      className={cn(styles.item(), ctx?.classNames?.item, className)}
      render={(buttonProps, state) => (
        <button {...buttonProps} type="button">
          {state.pressed && (
            <motion.span
              aria-hidden
              layoutId={ctx && !ctx.multiple ? `toggle-group-${ctx.id}` : undefined}
              initial={ctx?.multiple && !reduce ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={reduce ? { duration: 0 } : ctx?.multiple ? fade : glide}
              className={cn(styles.indicator(), ctx?.classNames?.indicator)}
            />
          )}
          {buttonProps.children}
        </button>
      )}
      {...props}
    >
      {children}
    </BaseToggle>
  );
}

export interface ToggleGroupItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  'aria-label'?: string;
}

export interface ToggleGroupProps extends Omit<BaseToggleGroup.Props<string>, 'className'>, Styles {
  /** Short form: the options. Or pass `<ToggleGroup.Item value="…">` children. */
  items?: ToggleGroupItem[];
  className?: string;
  classNames?: { root?: string; item?: string; indicator?: string; hover?: string };
}

/**
 * A row of toggles. Single (default): a segmented control whose soft accent fill glides to the
 * pressed item. `multiple`: a toolbar where any number of items can be pressed.
 * Short form: `<ToggleGroup items={[{ value, label }]} />`. Compound: `ToggleGroup.Item`.
 */
function ToggleGroupRoot({
  items,
  size = 'md',
  variant = 'outline',
  iconOnly = false,
  multiple = false,
  className,
  classNames,
  children,
  ref,
  ...props
}: ToggleGroupProps) {
  const id = React.useId();
  const glideRef = useGlide<HTMLDivElement>();
  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      glideRef(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node;
    },
    [glideRef, ref],
  );
  const styles = toggleGroupStyles({ size, variant, iconOnly });
  const ctx = React.useMemo<GroupContextValue>(
    () => ({ id, multiple, size, variant, iconOnly: Boolean(iconOnly), classNames }),
    [id, multiple, size, variant, iconOnly, classNames],
  );
  return (
    <GroupContext value={ctx}>
      <BaseToggleGroup ref={mergedRef} multiple={multiple} className={cn(styles.root(), classNames?.root, className)} {...props}>
        <span data-glide-block aria-hidden className={cn(glideBlockClass, styles.hover(), classNames?.hover)} />
        {items
          ? items.map((i) => (
              <ToggleGroupItem key={i.value} value={i.value} disabled={i.disabled} aria-label={i['aria-label']}>
                {i.label}
              </ToggleGroupItem>
            ))
          : children}
      </BaseToggleGroup>
    </GroupContext>
  );
}

export const ToggleGroup = Object.assign(ToggleGroupRoot, { Item: ToggleGroupItem });
