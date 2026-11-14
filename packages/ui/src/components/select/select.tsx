import { Select as BaseSelect } from '@base-ui/react/select';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { selectStyles } from './select.styles';

const styles = selectStyles();

type Cls = { className?: string };
type Props<C extends React.ElementType> = Omit<React.ComponentPropsWithRef<C>, 'className'> & Cls;

function SelectTrigger({
  className,
  children,
  size,
  ...props
}: Props<typeof BaseSelect.Trigger> & VariantProps<typeof selectStyles>) {
  return (
    <BaseSelect.Trigger className={cn(selectStyles({ size }).trigger(), className)} {...props}>
      {children}
      <BaseSelect.Icon className={styles.icon()}>
        <ChevronsUpDown />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

function SelectValue({ className, ...props }: Props<typeof BaseSelect.Value>) {
  return <BaseSelect.Value className={cn(styles.value(), className)} {...props} />;
}

/** The popup: portal + positioner + popup + list in one. */
function SelectContent({
  className,
  children,
  sideOffset = 6,
  alignItemWithTrigger = false,
  ...props
}: Props<typeof BaseSelect.Popup> & {
  sideOffset?: number;
  alignItemWithTrigger?: boolean;
}) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner className={styles.positioner()} sideOffset={sideOffset} alignItemWithTrigger={alignItemWithTrigger}>
        <BaseSelect.Popup className={cn(styles.popup(), className)} {...props}>
          <BaseSelect.List>{children}</BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

function SelectItem({ className, children, ...props }: Props<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item className={cn(styles.item(), className)} {...props}>
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className={styles.itemIndicator()}>
        <Check />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}

function SelectGroupLabel({ className, ...props }: Props<typeof BaseSelect.GroupLabel>) {
  return <BaseSelect.GroupLabel className={cn(styles.groupLabel(), className)} {...props} />;
}

function SelectSeparator({ className, ...props }: Props<typeof BaseSelect.Separator>) {
  return <BaseSelect.Separator className={cn(styles.separator(), className)} {...props} />;
}

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends VariantProps<typeof selectStyles> {
  /** The options. */
  items: SelectOption[];
  /** Shown in the trigger while nothing is picked. */
  placeholder?: React.ReactNode;
  /** The picked value (controlled). */
  value?: string | null;
  /** The value picked at first (uncontrolled). */
  defaultValue?: string | null;
  /** Called with the new value. */
  onValueChange?: (value: string | null) => void;
  /** Called when the popup opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Turns the whole select off. */
  disabled?: boolean;
  /** Shows the value but blocks changes. */
  readOnly?: boolean;
  /** Field name, for native form submission. */
  name?: string;
  /** A value must be picked before the form submits. */
  required?: boolean;
  /** Id of the trigger, for an external `<Label htmlFor>`. */
  id?: string;
  'aria-label'?: string;
  /** Classes for the trigger, merged last. */
  className?: string;
  /** Classes per slot. */
  classNames?: { trigger?: string; popup?: string; item?: string };
}

/**
 * Pick one value. Short form: `<Select items={[{ value, label }]} placeholder="…" />`.
 * Compound: `Select.Root`, `Select.Trigger`, `Select.Value`, `Select.Content`, `Select.Item`,
 * `Select.Group`, `Select.GroupLabel`, `Select.Separator`.
 */
function SelectSimple({
  items,
  placeholder,
  className,
  classNames,
  'aria-label': ariaLabel,
  id,
  size,
  onValueChange,
  onOpenChange,
  ...props
}: SelectProps) {
  return (
    <BaseSelect.Root
      items={items.map((i) => ({ value: i.value, label: i.label }))}
      onValueChange={(v) => onValueChange?.(v as string | null)}
      onOpenChange={onOpenChange ? (open) => onOpenChange(open) : undefined}
      {...props}
    >
      <SelectTrigger id={id} size={size} aria-label={ariaLabel} className={cn(classNames?.trigger, className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={classNames?.popup}>
        {items.map((i) => (
          <SelectItem key={i.value} value={i.value} disabled={i.disabled} className={classNames?.item}>
            {i.label}
          </SelectItem>
        ))}
      </SelectContent>
    </BaseSelect.Root>
  );
}

export const Select = Object.assign(SelectSimple, {
  Root: BaseSelect.Root,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Item: SelectItem,
  Group: BaseSelect.Group,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator,
});
