import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { comboboxStyles } from './combobox.styles';

type Size = VariantProps<typeof comboboxStyles>['size'];
const styles = comboboxStyles();
type Props<C extends React.ElementType> = Omit<React.ComponentPropsWithRef<C>, 'className'> & { className?: string };

const SizeContext = React.createContext<{ size: Size; multiple: boolean }>({ size: 'md', multiple: false });

/** The field around the input, trigger, clear button and chips; the popup is anchored to it. */
function ComboboxInputGroup({ className, size, multiple = false, ...props }: Props<typeof BaseCombobox.InputGroup> & { size?: Size; multiple?: boolean }) {
  return (
    <SizeContext value={{ size, multiple }}>
      <BaseCombobox.InputGroup className={cn(comboboxStyles({ size, multiple }).inputGroup(), className)} {...props} />
    </SizeContext>
  );
}

function ComboboxInput({ className, ...props }: Props<typeof BaseCombobox.Input>) {
  const { multiple } = React.useContext(SizeContext);
  return <BaseCombobox.Input className={cn(comboboxStyles({ multiple }).input(), className)} {...props} />;
}

/** Holds the clear and open buttons at the end of the field. */
const ComboboxActions = ({ className, ...props }: React.ComponentPropsWithRef<'div'>) => (
  <div className={cn(styles.actions(), className)} {...props} />
);

function ComboboxTrigger({ className, children, ...props }: Props<typeof BaseCombobox.Trigger>) {
  return (
    <BaseCombobox.Trigger aria-label="Open list" className={cn(styles.action(), className)} {...props}>
      {children ?? <ChevronsUpDown />}
    </BaseCombobox.Trigger>
  );
}

function ComboboxClear({ className, children, ...props }: Props<typeof BaseCombobox.Clear>) {
  return (
    <BaseCombobox.Clear aria-label="Clear" className={cn(styles.action(), className)} {...props}>
      {children ?? <X />}
    </BaseCombobox.Clear>
  );
}

function ComboboxChips({ className, ...props }: Props<typeof BaseCombobox.Chips>) {
  return <BaseCombobox.Chips className={cn(styles.chips(), className)} {...props} />;
}

/** A picked value in multiple mode, with a remove button. Backspace/Delete removes a focused chip. */
function ComboboxChip({ className, children, removeLabel = 'Remove', ...props }: Props<typeof BaseCombobox.Chip> & { removeLabel?: string }) {
  return (
    <BaseCombobox.Chip className={cn(styles.chip(), className)} {...props}>
      <span className="truncate">{children}</span>
      <BaseCombobox.ChipRemove aria-label={removeLabel} className={styles.chipRemove()}>
        <X />
      </BaseCombobox.ChipRemove>
    </BaseCombobox.Chip>
  );
}

/** The popup: portal + positioner + popup in one. Put `Combobox.Empty` and `Combobox.List` inside. */
function ComboboxContent({
  className,
  sideOffset = 6,
  align = 'start',
  ...props
}: Props<typeof BaseCombobox.Popup> & { sideOffset?: number; align?: 'start' | 'center' | 'end' }) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={sideOffset} align={align} className={styles.positioner()}>
        <BaseCombobox.Popup className={cn(styles.popup(), className)} {...props} />
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

function ComboboxList({ className, ...props }: Props<typeof BaseCombobox.List>) {
  return <BaseCombobox.List className={cn(styles.list(), className)} {...props} />;
}

function ComboboxItem({ className, children, ...props }: Props<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item className={cn(styles.item(), className)} {...props}>
      {children}
      <BaseCombobox.ItemIndicator className={styles.itemIndicator()}>
        <Check />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}

function ComboboxEmpty({ className, ...props }: Props<typeof BaseCombobox.Empty>) {
  return <BaseCombobox.Empty className={cn(styles.empty(), className)} {...props} />;
}

function ComboboxGroup({ className, ...props }: Props<typeof BaseCombobox.Group>) {
  return <BaseCombobox.Group className={cn(styles.group(), className)} {...props} />;
}

function ComboboxGroupLabel({ className, ...props }: Props<typeof BaseCombobox.GroupLabel>) {
  return <BaseCombobox.GroupLabel className={cn(styles.groupLabel(), className)} {...props} />;
}

function ComboboxSeparator({ className, ...props }: Props<typeof BaseCombobox.Separator>) {
  return <BaseCombobox.Separator className={cn(styles.separator(), className)} {...props} />;
}

/* ------------------------------------------------------------------------------------------ */

export interface ComboboxOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ComboboxGroupData {
  label: string;
  items: ComboboxOption[];
}

interface ComboboxBaseProps {
  /** Options as strings, `{ value, label }` objects, or groups `{ label, items }`. */
  items: (string | ComboboxOption)[] | ComboboxGroupData[];
  placeholder?: string;
  /** Shown when nothing matches the typed text. @default 'No results.' */
  emptyText?: React.ReactNode;
  size?: Size;
  disabled?: boolean;
  required?: boolean;
  /** Submit the value with a form. */
  name?: string;
  id?: string;
  'aria-label'?: string;
  className?: string;
  classNames?: { inputGroup?: string; input?: string; popup?: string; item?: string; chip?: string };
}

export interface ComboboxSingleProps extends ComboboxBaseProps {
  multiple?: false;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Show a button that clears the value. @default true */
  clearable?: boolean;
}

export interface ComboboxMultipleProps extends ComboboxBaseProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  clearable?: boolean;
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps;

const isGroups = (items: ComboboxProps['items']): items is ComboboxGroupData[] =>
  items.length > 0 && typeof items[0] === 'object' && 'items' in (items[0] as object);
const toOption = (o: string | ComboboxOption): ComboboxOption => (typeof o === 'string' ? { value: o, label: o } : o);

/**
 * A select you can type into to filter.
 *   <Combobox items={['Gothic 1', 'Gothic 2']} placeholder="Pick a game" />
 *   <Combobox multiple items={…} />  // picked values become chips
 * Compound: Combobox.Root / InputGroup / Input / Actions / Trigger / Clear / Chips / Chip / Value /
 * Content / Empty / List / Item / Group / GroupLabel / Collection / Separator.
 */
function ComboboxSimple(props: ComboboxProps) {
  const {
    items,
    placeholder,
    emptyText = 'No results.',
    size,
    multiple = false,
    clearable = !multiple,
    className,
    classNames,
    id,
    'aria-label': ariaLabel,
    value,
    defaultValue,
    onValueChange,
    ...root
  } = props;

  const { collection, labels, grouped } = React.useMemo(() => {
    const groups = isGroups(items) ? items : null;
    const flat = groups ? groups.flatMap((g) => g.items) : (items as (string | ComboboxOption)[]).map(toOption);
    const data = groups ?? flat;
    return {
      grouped: !!groups,
      labels: new Map(flat.map((o) => [o.value, o])),
      collection: BaseCombobox.createItems(data as ComboboxOption[], {
        getValue: (o: ComboboxOption) => o.value,
        getLabel: (o: ComboboxOption) => o.label,
      }),
    };
  }, [items]);

  const renderItem = (o: ComboboxOption) => (
    <ComboboxItem key={o.value} value={o.value} disabled={o.disabled} className={classNames?.item}>
      {o.icon}
      {o.label}
    </ComboboxItem>
  );

  const input = (extra?: { placeholder?: string }) => (
    <ComboboxInput id={id} aria-label={ariaLabel} placeholder={placeholder} className={classNames?.input} {...extra} />
  );

  return (
    <BaseCombobox.Root
      items={collection}
      multiple={multiple}
      value={value as never}
      defaultValue={defaultValue as never}
      onValueChange={onValueChange as never}
      {...root}
    >
      <ComboboxInputGroup size={size} multiple={multiple} className={cn(classNames?.inputGroup, className)}>
        {multiple ? (
          <BaseCombobox.Value>
            {(picked: string[]) => (
              <ComboboxChips>
                {picked.map((v) => (
                  <ComboboxChip key={v} removeLabel={`Remove ${labels.get(v)?.label ?? v}`} className={classNames?.chip}>
                    {labels.get(v)?.label ?? v}
                  </ComboboxChip>
                ))}
                {input({ placeholder: picked.length ? undefined : placeholder })}
              </ComboboxChips>
            )}
          </BaseCombobox.Value>
        ) : (
          input()
        )}
        <ComboboxActions>
          {clearable && <ComboboxClear />}
          <ComboboxTrigger />
        </ComboboxActions>
      </ComboboxInputGroup>
      <ComboboxContent className={classNames?.popup}>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
        <ComboboxList>
          {grouped
            ? (group: ComboboxGroupData) => (
                <ComboboxGroup key={group.label} items={group.items}>
                  <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                  <BaseCombobox.Collection>{renderItem}</BaseCombobox.Collection>
                </ComboboxGroup>
              )
            : renderItem}
        </ComboboxList>
      </ComboboxContent>
    </BaseCombobox.Root>
  );
}

export const Combobox = Object.assign(ComboboxSimple, {
  Root: BaseCombobox.Root,
  InputGroup: ComboboxInputGroup,
  Input: ComboboxInput,
  Actions: ComboboxActions,
  Trigger: ComboboxTrigger,
  Clear: ComboboxClear,
  Chips: ComboboxChips,
  Chip: ComboboxChip,
  Value: BaseCombobox.Value,
  Content: ComboboxContent,
  Empty: ComboboxEmpty,
  List: ComboboxList,
  Item: ComboboxItem,
  Group: ComboboxGroup,
  GroupLabel: ComboboxGroupLabel,
  Collection: BaseCombobox.Collection,
  Separator: ComboboxSeparator,
  useFilter: BaseCombobox.useFilter,
  createItems: BaseCombobox.createItems,
});
