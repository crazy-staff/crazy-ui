import { Autocomplete } from '@base-ui/react/autocomplete';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { Search } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { Kbd, KbdGroup } from '../kbd/kbd';
import { commandStyles } from './command.styles';

const styles = commandStyles();
type Props<C extends React.ElementType> = Omit<React.ComponentPropsWithRef<C>, 'className'> & { className?: string };

/** Lets Command.Dialog close itself when an item runs. */
const CommandContext = React.createContext<{ onItemSelect?: () => void }>({});

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

/* ------------------------------------------------------------------------------------------ */

export interface CommandItemData {
  value: string;
  label: string;
  icon?: React.ReactNode;
  /** Shown as Kbd keys, e.g. `'Ctrl+G'`. */
  shortcut?: string | string[];
  /** Extra words that match the search (e.g. `['invincible']` for God mode). */
  keywords?: string[];
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
  /** Content under the list (key hints). */
  footer?: React.ReactNode;
  classNames?: { root?: string; input?: string; list?: string; item?: string };
}

const matches = (item: unknown, query: string) => {
  const it = item as CommandItemData;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [it.label, ...(it.keywords ?? [])].some((s) => s.toLowerCase().includes(q));
};

/**
 * A command palette.
 *   <Command groups={[{ label: 'Player', items: [{ value: 'god', label: 'God mode', shortcut: 'Ctrl+G' }] }]} />
 * In a modal: <Command.Dialog open={open} onOpenChange={setOpen} groups={…} />.
 * Compound: Command.Root / Input / List / Empty / Group / GroupLabel / Collection / Item / Shortcut /
 * Separator / Footer.
 */
function CommandSimple({ groups, placeholder = 'Type a command or search…', emptyText = 'No results.', footer, className, classNames, filter, ...props }: CommandProps) {
  return (
    <CommandRoot items={groups} filter={filter ?? matches} className={cn(classNames?.root, className)} {...props}>
      <CommandInput placeholder={placeholder} aria-label={props['aria-label'] ?? 'Search commands'} className={classNames?.input} />
      <CommandEmpty>{emptyText}</CommandEmpty>
      <CommandList className={classNames?.list}>
        {(group: CommandGroupData) => (
          <CommandGroup key={group.label} items={group.items}>
            <CommandGroupLabel>{group.label}</CommandGroupLabel>
            <Autocomplete.Collection>
              {(item: CommandItemData) => (
                <CommandItem key={item.value} value={item} disabled={item.disabled} onSelect={item.onSelect} className={classNames?.item}>
                  {item.icon}
                  <span className="truncate">{item.label}</span>
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
    <BaseDialog.Root open={open} onOpenChange={setOpen}>
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
  Dialog: CommandDialog,
});
