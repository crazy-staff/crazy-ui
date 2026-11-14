import { Autocomplete } from '@base-ui/react/autocomplete';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { Menu } from '@base-ui/react/menu';
import { ArrowRight, ChevronDown, ChevronRight, Search, X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import { Kbd, KbdGroup } from '../kbd/kbd';
import { Spinner } from '../spinner/spinner';
import { commandStyles } from './command.styles';

const styles = commandStyles();
type Props<C extends React.ElementType> = Omit<React.ComponentPropsWithRef<C>, 'className'> & { className?: string };

/** Lets Command.Dialog close itself when an item runs. */
const CommandContext = React.createContext<{ onItemSelect?: () => void }>({});
/** The typed text, so `Command.Highlight` can mark matches without being told the query. */
const CommandSearchContext = React.createContext('');

type AutocompleteRootProps = React.ComponentProps<typeof Autocomplete.Root>;

export interface CommandRootProps
  extends Pick<AutocompleteRootProps, 'items' | 'filter' | 'filteredItems' | 'itemToStringValue' | 'limit' | 'loopFocus'> {
  /** The typed text (controlled). */
  search?: string;
  defaultSearch?: string;
  onSearchChange?: (search: string) => void;
  className?: string;
  children?: React.ReactNode;
  'aria-label'?: string;
}

/**
 * The palette: an always-open list filtered by the input. Arrow keys move, Enter runs the item.
 * Pass `items` (flat or `{ label, items }` groups) and render them with `Command.List`, or render
 * `Command.Item`s yourself and filter them by passing `filteredItems`.
 */
function CommandRoot({
  search,
  defaultSearch = '',
  onSearchChange,
  className,
  children,
  itemToStringValue,
  'aria-label': ariaLabel,
  ...props
}: CommandRootProps) {
  const [inner, setInner] = React.useState(defaultSearch);
  const value = search ?? inner;
  return (
    <CommandSearchContext value={value}>
      <div role="group" aria-label={ariaLabel} className={cn(styles.root(), className)}>
        <Autocomplete.Root
          inline
          open
          autoHighlight="always"
          keepHighlight
          itemToStringValue={itemToStringValue ?? ((item: unknown) => (item as { label?: string }).label ?? String(item))}
          value={value}
          onValueChange={(next, details) => {
            // running an item must not write its label into the search field
            if (details.reason === 'item-press') return;
            setInner(next);
            onSearchChange?.(next);
          }}
          {...props}
        >
          {children}
        </Autocomplete.Root>
      </div>
    </CommandSearchContext>
  );
}

function CommandInput({ className, ...props }: Props<typeof Autocomplete.Input>) {
  return (
    <div className={styles.inputWrap()}>
      <Search aria-hidden />
      <Autocomplete.Input className={cn(styles.input(), className)} {...props} />
    </div>
  );
}

function CommandList({ className, ...props }: Props<typeof Autocomplete.List>) {
  return <Autocomplete.List className={cn(styles.list(), className)} {...props} />;
}

function CommandEmpty({ className, ...props }: Props<typeof Autocomplete.Empty>) {
  return <Autocomplete.Empty className={cn(styles.empty(), className)} {...props} />;
}

function CommandGroup({ className, ...props }: Props<typeof Autocomplete.Group>) {
  return <Autocomplete.Group className={cn(styles.group(), className)} {...props} />;
}

function CommandGroupLabel({ className, ...props }: Props<typeof Autocomplete.GroupLabel>) {
  return <Autocomplete.GroupLabel className={cn(styles.groupLabel(), className)} {...props} />;
}

function CommandSeparator({ className, ...props }: Props<typeof Autocomplete.Separator>) {
  return <Autocomplete.Separator className={cn(styles.separator(), className)} {...props} />;
}

export interface CommandItemProps extends Props<typeof Autocomplete.Item> {
  /** Runs on click and on Enter. */
  onSelect?: () => void;
}

function CommandItem({ className, onSelect, onClick, ...props }: CommandItemProps) {
  const { onItemSelect } = React.useContext(CommandContext);
  return (
    <Autocomplete.Item
      className={cn(styles.item(), className)}
      onClick={(e) => {
        onClick?.(e);
        onSelect?.();
        onItemSelect?.();
      }}
      {...props}
    />
  );
}

/** Keys at the end of an item: `<Command.Shortcut keys="Ctrl+G" />` or `keys={['Ctrl', 'G']}`. */
function CommandShortcut({ keys, className, ...props }: React.ComponentPropsWithRef<'span'> & { keys: string | string[] }) {
  const list = Array.isArray(keys) ? keys : keys.split('+');
  return (
    <KbdGroup aria-hidden className={cn(styles.shortcut(), className)} {...props}>
      {list.map((k) => (
        <Kbd key={k}>{k}</Kbd>
      ))}
    </KbdGroup>
  );
}

/** A strip under the list for hints (`↑↓ to move`, `Enter to run`). */
function CommandFooter({ className, ...props }: React.ComponentPropsWithRef<'div'>) {
  return <div className={cn(styles.footer(), className)} {...props} />;
}

/** Shown instead of the list while results load (`role="status"`). */
function CommandLoading({ className, children = 'Searching…', ...props }: React.ComponentPropsWithRef<'div'>) {
  return (
    <div role="status" className={cn(styles.loading(), className)} {...props}>
      <Spinner size="sm" tone="muted" aria-hidden aria-label={undefined} role={undefined} />
      {children}
    </div>
  );
}

/** Stacks a breadcrumb line, a title and a description inside an item. */
function CommandItemContent({ className, ...props }: React.ComponentPropsWithRef<'span'>) {
  return <span className={cn(styles.itemContent(), className)} {...props} />;
}

export interface CommandItemBreadcrumbsProps extends Omit<React.ComponentPropsWithRef<'span'>, 'children'> {
  /** The path above the title, e.g. `['Components', 'Button']`. */
  items: React.ReactNode[];
}

/** The small section / path line above an item's title. */
function CommandItemBreadcrumbs({ items, className, ...props }: CommandItemBreadcrumbsProps) {
  return (
    <span className={cn(styles.itemBreadcrumbs(), className)} {...props}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight aria-hidden />}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </span>
  );
}

function CommandItemTitle({ className, ...props }: React.ComponentPropsWithRef<'span'>) {
  return <span className={cn(styles.itemTitle(), className)} {...props} />;
}

function CommandItemDescription({ className, ...props }: React.ComponentPropsWithRef<'span'>) {
  return <span className={cn(styles.itemDescription(), className)} {...props} />;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Splits `text` into parts, `match: true` for every piece that matches a word of `query`. */
export function highlightParts(text: string, query: string): { text: string; match: boolean }[] {
  const words = query.trim().split(/\s+/).filter(Boolean).map(escapeRegExp);
  if (!words.length || !text) return [{ text, match: false }];
  const re = new RegExp(`(${words.sort((a, b) => b.length - a.length).join('|')})`, 'gi');
  return text
    .split(re)
    .filter(Boolean)
    .map((part) => ({ text: part, match: words.some((w) => new RegExp(`^${w}$`, 'i').test(part)) }));
}

export interface CommandHighlightProps extends Omit<React.ComponentPropsWithRef<'span'>, 'children'> {
  text: string;
  /** The words to mark. @default the text typed into the palette */
  query?: string;
  classNames?: { mark?: string };
}

/** The text with every match of the query wrapped in `<mark>`. */
function CommandHighlight({ text, query, className, classNames, ...props }: CommandHighlightProps) {
  const typed = React.useContext(CommandSearchContext);
  return (
    <span className={className} {...props}>
      {highlightParts(text, query ?? typed).map((part, i) =>
        part.match ? (
          <mark key={i} className={cn(styles.highlight(), classNames?.mark)}>
            {part.text}
          </mark>
        ) : (
          <React.Fragment key={i}>{part.text}</React.Fragment>
        ),
      )}
    </span>
  );
}

export interface CommandJumpItemProps extends CommandItemProps {
  /** The words before the target. @default 'Jump to' */
  label?: React.ReactNode;
}

/** A quick action at the top of the list: `Jump to <target>`, with an Enter hint when highlighted. */
function CommandJumpItem({ label = 'Jump to', children, className, ...props }: CommandJumpItemProps) {
  return (
    <CommandItem className={cn(styles.jump(), className)} {...props}>
      <ArrowRight aria-hidden />
      <span className="min-w-0 truncate">
        {label} <span className={styles.jumpTarget()}>{children}</span>
      </span>
      <Kbd aria-hidden className={styles.jumpKey()}>
        Enter
      </Kbd>
    </CommandItem>
  );
}

export interface CommandHintProps extends Omit<React.ComponentPropsWithRef<'span'>, 'children'> {
  /** Keys, e.g. `['↑', '↓']` or `'Enter'`. */
  keys: string | string[];
  /** What the keys do, e.g. `'to move'`. */
  children?: React.ReactNode;
}

/** A key hint for the footer: `<Command.Hint keys="Enter">to open</Command.Hint>`. */
function CommandHint({ keys, children, className, ...props }: CommandHintProps) {
  const list = Array.isArray(keys) ? keys : [keys];
  return (
    <span className={cn(styles.hint(), className)} {...props}>
      {list.map((k) => (
        <Kbd key={k}>{k}</Kbd>
      ))}
      {children}
    </span>
  );
}

export interface CommandFilterOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface CommandFilterProps {
  /** Name shown before the value, e.g. `'Section'`. */
  label: string;
  options: CommandFilterOption[];
  value?: string;
  /** The value that means "not filtered", shown plainly. @default the first option */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  classNames?: { trigger?: string; content?: string; option?: string };
}

/** One filter in the footer: a small `Label: value` button opening a radio menu. */
function CommandFilter({ label, options, value, defaultValue, onValueChange, className, classNames }: CommandFilterProps) {
  const base = defaultValue ?? options[0]?.value;
  const current = options.find((o) => o.value === (value ?? base)) ?? options[0];
  const active = current !== undefined && current.value !== base;
  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label={`${label}: ${current?.label ?? ''}`}
        className={cn(styles.filterTrigger(), active && styles.filterTriggerActive(), classNames?.trigger, className)}
      >
        <span className={styles.filterLabel()}>{label}:</span>
        <span className={styles.filterValue()}>{current?.label}</span>
        <ChevronDown aria-hidden />
      </Menu.Trigger>
      <DropdownMenu.Content align="start" side="top" className={classNames?.content}>
        <DropdownMenu.RadioGroup value={current?.value} onValueChange={(next: string) => onValueChange?.(next)}>
          {options.map((o) => (
            <DropdownMenu.RadioItem key={o.value} value={o.value} disabled={o.disabled} closeOnClick className={classNames?.option}>
              <span className={styles.filterOption()}>
                <span>{o.label}</span>
                {o.description && <span className={styles.filterOptionDescription()}>{o.description}</span>}
              </span>
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </Menu.Root>
  );
}

export interface CommandFiltersProps extends React.ComponentPropsWithRef<'div'> {
  /** Called by the "Clear filters" button. Leave out to hide the button. */
  onClear?: () => void;
  /** Whether any filter is set; the button is visible only then, but its place is always kept. */
  canClear?: boolean;
  /** @default 'Clear filters' */
  clearLabel?: React.ReactNode;
  classNames?: { list?: string; clear?: string };
}

/**
 * The filter row. Filters wrap onto more lines when narrow; "Clear filters" sits in its own slot at the
 * end that never wraps and keeps its space when hidden, so setting a filter never moves anything.
 */
function CommandFilters({ onClear, canClear = false, clearLabel = 'Clear filters', className, classNames, children, ...props }: CommandFiltersProps) {
  return (
    <div role="group" aria-label="Filters" className={cn(styles.filters(), className)} {...props}>
      <div className={cn(styles.filterList(), classNames?.list)}>{children}</div>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-hidden={!canClear}
          tabIndex={canClear ? undefined : -1}
          disabled={!canClear}
          className={cn(styles.clear(), !canClear && 'invisible', classNames?.clear)}
        >
          <X aria-hidden />
          {clearLabel}
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */

export interface CommandItemData {
  value: string;
  label: string;
  icon?: React.ReactNode;
  /** Shown as Kbd keys, e.g. `'Ctrl+G'`. */
  shortcut?: string | string[];
  /** Extra words that match the search (e.g. `['invincible']` for God mode). */
  keywords?: string[];
  /** A second line under the label. */
  description?: string;
  /** A path line above the label, e.g. `['Player']`. */
  breadcrumbs?: string[];
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandGroupData {
  label: string;
  items: CommandItemData[];
}

export interface CommandProps extends Omit<CommandRootProps, 'items' | 'children'> {
  /** Groups of commands. */
  groups: CommandGroupData[];
  placeholder?: string;
  /** Shown when nothing matches. @default 'No results.' */
  emptyText?: React.ReactNode;
  /** Content under the list (key hints, `Command.Filters`). */
  footer?: React.ReactNode;
  /** Show `Command.Loading` instead of the list. */
  loading?: boolean;
  /** @default 'Searching…' */
  loadingText?: React.ReactNode;
  classNames?: { root?: string; input?: string; list?: string; item?: string };
}

const matches = (item: unknown, query: string) => {
  const it = item as CommandItemData;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [it.label, it.description ?? '', ...(it.keywords ?? [])].some((s) => s.toLowerCase().includes(q));
};

/**
 * A command palette.
 *   <Command groups={[{ label: 'Player', items: [{ value: 'god', label: 'God mode', shortcut: 'Ctrl+G' }] }]} />
 * In a modal: <Command.Dialog open={open} onOpenChange={setOpen} groups={…} />.
 * Compound: Command.Root / Input / List / Empty / Loading / Group / GroupLabel / Collection / Item /
 * ItemContent / ItemBreadcrumbs / ItemTitle / ItemDescription / Highlight / JumpItem / Shortcut /
 * Separator / Footer / Hint / Filters / Filter.
 */
function CommandSimple({
  groups,
  placeholder = 'Type a command or search…',
  emptyText = 'No results.',
  footer,
  loading = false,
  loadingText,
  className,
  classNames,
  filter,
  ...props
}: CommandProps) {
  return (
    <CommandRoot items={loading ? [] : groups} filter={filter ?? matches} className={cn(classNames?.root, className)} {...props}>
      <CommandInput placeholder={placeholder} aria-label={props['aria-label'] ?? 'Search commands'} className={classNames?.input} />
      {loading ? <CommandLoading>{loadingText}</CommandLoading> : <CommandEmpty>{emptyText}</CommandEmpty>}
      <CommandList className={classNames?.list}>
        {(group: CommandGroupData) => (
          <CommandGroup key={group.label} items={group.items}>
            <CommandGroupLabel>{group.label}</CommandGroupLabel>
            <Autocomplete.Collection>
              {(item: CommandItemData) => (
                <CommandItem key={item.value} value={item} disabled={item.disabled} onSelect={item.onSelect} className={classNames?.item}>
                  {item.icon}
                  {item.description || item.breadcrumbs ? (
                    <CommandItemContent>
                      {item.breadcrumbs && <CommandItemBreadcrumbs items={item.breadcrumbs} />}
                      <CommandHighlight text={item.label} className={styles.itemTitle()} />
                      {item.description && (
                        <CommandItemDescription>
                          <CommandHighlight text={item.description} />
                        </CommandItemDescription>
                      )}
                    </CommandItemContent>
                  ) : (
                    <CommandHighlight text={item.label} className="truncate" />
                  )}
                  {item.shortcut && <CommandShortcut keys={item.shortcut} />}
                </CommandItem>
              )}
            </Autocomplete.Collection>
          </CommandGroup>
        )}
      </CommandList>
      {footer && <CommandFooter>{footer}</CommandFooter>}
    </CommandRoot>
  );
}

export interface CommandDialogProps extends Partial<CommandProps> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The element that opens the palette. */
  trigger?: React.ReactElement;
  /** A handle from `Dialog.createHandle()`, so triggers elsewhere in the app (`<Dialog.Trigger handle>`) open it. */
  handle?: BaseDialog.Handle<unknown>;
  /** Accessible name of the dialog. @default 'Command palette' */
  title?: string;
  /** Close the dialog after an item runs. @default true */
  closeOnSelect?: boolean;
  /** Your own `Command.Root` content instead of `groups`. */
  children?: React.ReactNode;
}

/** The palette in a modal, positioned high on the screen like Spotlight. */
function CommandDialog({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  trigger,
  handle,
  title = 'Command palette',
  closeOnSelect = true,
  children,
  groups,
  className,
  ...props
}: CommandDialogProps) {
  const [inner, setInner] = React.useState(defaultOpen);
  const open = openProp ?? inner;
  const setOpen = (next: boolean) => {
    setInner(next);
    onOpenChange?.(next);
  };
  return (
    <BaseDialog.Root open={open} onOpenChange={setOpen} handle={handle}>
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop()} />
        <BaseDialog.Popup aria-label={title} className={cn(styles.dialog(), className)}>
          <CommandContext value={{ onItemSelect: closeOnSelect ? () => setOpen(false) : undefined }}>
            {children ?? <CommandSimple groups={groups ?? []} className="rounded-none border-0" {...props} />}
          </CommandContext>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export const Command = Object.assign(CommandSimple, {
  Root: CommandRoot,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  GroupLabel: CommandGroupLabel,
  Collection: Autocomplete.Collection,
  Item: CommandItem,
  Shortcut: CommandShortcut,
  Separator: CommandSeparator,
  Footer: CommandFooter,
  Loading: CommandLoading,
  ItemContent: CommandItemContent,
  ItemBreadcrumbs: CommandItemBreadcrumbs,
  ItemTitle: CommandItemTitle,
  ItemDescription: CommandItemDescription,
  Highlight: CommandHighlight,
  JumpItem: CommandJumpItem,
  Hint: CommandHint,
  Filters: CommandFilters,
  Filter: CommandFilter,
  Dialog: CommandDialog,
});
