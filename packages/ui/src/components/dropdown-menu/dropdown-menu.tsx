import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { Menu } from '@base-ui/react/menu';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { Check, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { type MobileMode, useDrawerMode } from '../../lib/responsive';
import { cn } from '../../lib/tv';
import { Drawer } from '../drawer/drawer';
import { menuDrawerStyles, menuStyles } from './dropdown-menu.styles';

const styles = menuStyles();
const ds = menuDrawerStyles();

type Side = 'top' | 'right' | 'bottom' | 'left' | 'inline-start' | 'inline-end';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDetails = any;

/* ------------------------------------------------------------------------------------------------
 * Phone mode: below `sm` the same compound parts render a bottom drawer of large rows instead of a
 * floating menu (guidelines → Mobile). The parts read this context; without it (desktop, or inside
 * Context Menu / Menubar, which reuse the parts) they are Base UI menu parts.
 * ----------------------------------------------------------------------------------------------*/

interface DrawerMenuValue {
  close: () => void;
}
const DrawerMenuContext = React.createContext<DrawerMenuValue | null>(null);
const useDrawerMenu = () => React.useContext(DrawerMenuContext);

interface DrawerRadioValue {
  value: unknown;
  setValue: (value: unknown) => void;
}
const DrawerRadioContext = React.createContext<DrawerRadioValue | null>(null);

/** Controlled-or-uncontrolled state for the drawer parts. */
function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (value: T) => void) {
  const [inner, setInner] = React.useState(defaultValue);
  const current = value !== undefined ? value : inner;
  const set = React.useCallback(
    (next: T) => {
      setInner(next);
      onChange?.(next);
    },
    [onChange],
  );
  return [current, set] as const;
}

/* ---------------------------------------------------------------------------------------------- */

export interface DropdownMenuRootProps extends React.ComponentProps<typeof Menu.Root> {
  /** On a phone (below `sm`) open as a bottom drawer (`'drawer'`, the default) or keep the menu (`'none'`). */
  mobile?: MobileMode;
}

/** The menu's state. On a phone it holds a drawer instead (see `mobile`). */
function DropdownMenuRoot({ mobile = 'drawer', open, defaultOpen = false, onOpenChange, children, ...props }: DropdownMenuRootProps) {
  const drawer = useDrawerMode(mobile);
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = open ?? inner;
  const setOpen = React.useCallback(
    (next: boolean, details?: AnyDetails) => {
      setInner(next);
      onOpenChange?.(next, details);
    },
    [onOpenChange],
  );
  const ctx = React.useMemo(() => ({ close: () => setOpen(false) }), [setOpen]);
  if (!drawer) {
    return (
      <Menu.Root open={isOpen} onOpenChange={setOpen} {...props}>
        {children}
      </Menu.Root>
    );
  }
  return (
    <BaseDrawer.Root open={isOpen} onOpenChange={(next, details) => setOpen(next, details)}>
      <DrawerMenuContext.Provider value={ctx}>{children as React.ReactNode}</DrawerMenuContext.Provider>
    </BaseDrawer.Root>
  );
}

/** The element that opens the menu (or the drawer on a phone). */
function DropdownMenuTrigger(props: React.ComponentPropsWithRef<typeof Menu.Trigger>) {
  const drawer = useDrawerMenu();
  if (drawer) {
    const { openOnHover: _h, delay: _d, closeDelay: _c, handle: _x, payload: _p, ...rest } = props as AnyDetails;
    return <BaseDrawer.Trigger {...rest} />;
  }
  return <Menu.Trigger {...props} />;
}

export interface DropdownMenuContentProps extends React.ComponentPropsWithRef<typeof Menu.Popup> {
  side?: Side;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  /**
   * The menu's name: the drawer's title on a phone, and the popup's accessible name. Shown at the top
   * of the desktop popup too with `showTitle`.
   */
  title?: string;
  /** Also show `title` at the top of the desktop menu, with room under it (pickers: language, theme). */
  showTitle?: boolean;
  classNames?: { positioner?: string; popup?: string; title?: string };
}

function DropdownMenuContent({
  side = 'bottom',
  align = 'start',
  sideOffset = 6,
  title,
  showTitle = false,
  className,
  classNames,
  children,
  ...props
}: DropdownMenuContentProps) {
  const drawer = useDrawerMenu();
  if (drawer) {
    const label = (props as { 'aria-label'?: string })['aria-label'];
    return (
      <Drawer.Content touch aria-label={title ? undefined : label}>
        {title && <Drawer.Title className={classNames?.title}>{title}</Drawer.Title>}
        <div className={cn(ds.list(), !title && 'pt-0')}>{children as React.ReactNode}</div>
      </Drawer.Content>
    );
  }
  return (
    <Menu.Portal>
      <Menu.Positioner side={side} align={align} sideOffset={sideOffset} className={cn(styles.positioner(), classNames?.positioner)}>
        <Menu.Popup aria-label={title} className={cn(styles.popup(), classNames?.popup, className)} {...props}>
          {showTitle && title && (
            <div aria-hidden className={cn(styles.title(), classNames?.title)}>
              {title}
            </div>
          )}
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

/** A drawer row: a `<button>` (or the `render` element, e.g. a router link) that closes the drawer. */
function DrawerRow({
  render,
  className,
  closeOnClick,
  onClick,
  disabled,
  children,
  extra,
}: {
  render?: AnyDetails;
  className?: string;
  closeOnClick: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  extra?: Record<string, unknown>;
}) {
  const drawer = useDrawerMenu();
  return useRender({
    render,
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      render ? {} : { type: 'button', disabled },
      {
        className,
        'aria-disabled': render && disabled ? true : undefined,
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (closeOnClick && !event.defaultPrevented) drawer?.close();
        },
        children,
      },
      extra ?? {},
    ),
  });
}

export interface DropdownMenuItemProps extends React.ComponentPropsWithRef<typeof Menu.Item> {
  /** Paint the item in the danger colour (delete, sign out …). */
  danger?: boolean;
  /** Mark the item as the picked option: tinted, with a small check at the end (a one-of-many choice). */
  checked?: boolean;
}

function DropdownMenuItem({ danger, checked, className, children, ...props }: DropdownMenuItemProps) {
  const drawer = useDrawerMenu();
  const picked = checked !== undefined;
  if (drawer) {
    const { render, closeOnClick = true, onClick, disabled } = props as AnyDetails;
    return (
      <DrawerRow
        render={render}
        closeOnClick={closeOnClick}
        onClick={onClick}
        disabled={disabled}
        className={cn(ds.row(), danger && ds.danger(), checked && ds.picked(), className)}
        extra={picked ? { 'aria-pressed': checked } : undefined}
      >
        {children as React.ReactNode}
        {checked && <Check aria-hidden className={ds.check()} />}
      </DrawerRow>
    );
  }
  return (
    <Menu.Item
      className={cn(styles.item(), picked && styles.picked(), danger && styles.danger(), className)}
      {...(picked ? { role: 'menuitemradio', 'aria-checked': checked, 'data-checked': checked ? '' : undefined } : {})}
      {...props}
    >
      {children}
      {checked && (
        <span className={styles.indicator()}>
          <Check aria-hidden />
        </span>
      )}
    </Menu.Item>
  );
}

function DropdownMenuCheckboxItem({ className, children, ...props }: React.ComponentPropsWithRef<typeof Menu.CheckboxItem>) {
  const drawer = useDrawerMenu();
  const { checked: checkedProp, defaultChecked = false, onCheckedChange, closeOnClick = false, disabled, onClick } = props as AnyDetails;
  const [checked, setChecked] = useControllable<boolean>(checkedProp, defaultChecked);
  if (drawer) {
    return (
      <DrawerRow
        closeOnClick={closeOnClick}
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event);
          setChecked(!checked);
          onCheckedChange?.(!checked, {} as AnyDetails);
        }}
        className={cn(ds.row(), checked && ds.picked(), className as string)}
        extra={{ 'aria-pressed': checked }}
      >
        {children as React.ReactNode}
        {checked && <Check aria-hidden className={ds.check()} />}
      </DrawerRow>
    );
  }
  return (
    <Menu.CheckboxItem className={cn(styles.item(), styles.picked(), className)} {...props}>
      {children}
      <Menu.CheckboxItemIndicator className={styles.indicator()}>
        <Check />
      </Menu.CheckboxItemIndicator>
    </Menu.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({ children, ...props }: React.ComponentPropsWithRef<typeof Menu.RadioGroup>) {
  const drawer = useDrawerMenu();
  const { value: valueProp, defaultValue, onValueChange, className } = props as AnyDetails;
  const [value, setValue] = useControllable<unknown>(valueProp, defaultValue);
  const ctx = React.useMemo(
    () => ({
      value,
      setValue: (next: unknown) => {
        setValue(next);
        onValueChange?.(next, {} as AnyDetails);
      },
    }),
    [value, setValue, onValueChange],
  );
  if (drawer) {
    return (
      <div role="group" className={cn(ds.group(), className as string)}>
        <DrawerRadioContext.Provider value={ctx}>{children as React.ReactNode}</DrawerRadioContext.Provider>
      </div>
    );
  }
  return <Menu.RadioGroup {...props}>{children}</Menu.RadioGroup>;
}

/** One option of a `RadioGroup`. Picking it closes the menu (`closeOnClick`, default true). */
function DropdownMenuRadioItem({ className, children, closeOnClick = true, ...props }: React.ComponentPropsWithRef<typeof Menu.RadioItem>) {
  const drawer = useDrawerMenu();
  const radio = React.useContext(DrawerRadioContext);
  if (drawer) {
    const checked = radio ? Object.is(radio.value, props.value) : false;
    return (
      <DrawerRow
        closeOnClick={closeOnClick}
        disabled={props.disabled}
        onClick={(event) => {
          (props.onClick as AnyDetails)?.(event);
          radio?.setValue(props.value);
        }}
        className={cn(ds.row(), checked && ds.picked(), className as string)}
        extra={{ 'aria-pressed': checked }}
      >
        {children as React.ReactNode}
        {checked && <Check aria-hidden className={ds.check()} />}
      </DrawerRow>
    );
  }
  return (
    <Menu.RadioItem className={cn(styles.item(), styles.picked(), className)} closeOnClick={closeOnClick} {...props}>
      {children}
      <Menu.RadioItemIndicator className={styles.indicator()}>
        <Check />
      </Menu.RadioItemIndicator>
    </Menu.RadioItem>
  );
}

function DropdownMenuGroup({ className, children, ...props }: React.ComponentPropsWithRef<typeof Menu.Group>) {
  const drawer = useDrawerMenu();
  if (drawer) return <div role="group" className={cn(ds.group(), className as string)}>{children as React.ReactNode}</div>;
  return (
    <Menu.Group className={className} {...props}>
      {children}
    </Menu.Group>
  );
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentPropsWithRef<typeof Menu.Separator>) {
  const drawer = useDrawerMenu();
  if (drawer) return <div role="separator" className={cn(ds.separator(), className as string)} />;
  return <Menu.Separator className={cn(styles.separator(), className)} {...props} />;
}

function DropdownMenuGroupLabel({ className, children, ...props }: React.ComponentPropsWithRef<typeof Menu.GroupLabel>) {
  const drawer = useDrawerMenu();
  if (drawer) return <div className={cn(ds.groupLabel(), className as string)}>{children as React.ReactNode}</div>;
  return (
    <Menu.GroupLabel className={cn(styles.groupLabel(), className)} {...props}>
      {children}
    </Menu.GroupLabel>
  );
}

/** A keyboard hint at the end of an item, e.g. `Ctrl K`. Hidden in the phone drawer. */
function DropdownMenuShortcut({ className, ...props }: React.ComponentPropsWithRef<'kbd'>) {
  const drawer = useDrawerMenu();
  if (drawer) return null;
  return <kbd className={cn(styles.shortcut(), className)} {...props} />;
}

function DropdownMenuSub({ children, ...props }: React.ComponentProps<typeof Menu.SubmenuRoot>) {
  const drawer = useDrawerMenu();
  if (drawer) return <>{children}</>;
  return <Menu.SubmenuRoot {...props}>{children}</Menu.SubmenuRoot>;
}

/** Opens a submenu. In the phone drawer it is the heading of the submenu's rows, shown inline. */
function DropdownMenuSubTrigger({ className, children, ...props }: React.ComponentPropsWithRef<typeof Menu.SubmenuTrigger>) {
  const drawer = useDrawerMenu();
  if (drawer) return <div className={cn(ds.groupLabel(), '[&_svg]:hidden', className as string)}>{children as React.ReactNode}</div>;
  return (
    <Menu.SubmenuTrigger className={cn(styles.item(), 'data-[popup-open]:bg-hover', className)} {...props}>
      {children}
      <ChevronRight className={styles.subChevron()} />
    </Menu.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({ children, ...props }: DropdownMenuContentProps) {
  const drawer = useDrawerMenu();
  if (drawer) return <div role="group" className={ds.sub()}>{children as React.ReactNode}</div>;
  return (
    <DropdownMenuContent side="inline-end" align="start" sideOffset={4} {...props}>
      {children}
    </DropdownMenuContent>
  );
}

export type DropdownMenuEntry =
  | {
      type?: 'item';
      label: React.ReactNode;
      icon?: React.ReactNode;
      shortcut?: string;
      danger?: boolean;
      disabled?: boolean;
      /** The picked option of a one-of-many choice: tinted, with a check at the end. */
      checked?: boolean;
      /** An element the item renders as, e.g. a router link `<Link to="/settings" />`. */
      render?: React.ReactElement;
      lang?: string;
      onClick?: () => void;
    }
  | { type: 'separator' }
  | { type: 'label'; label: React.ReactNode };

export interface DropdownMenuProps extends Omit<DropdownMenuRootProps, 'children'> {
  /** The button that opens the menu. */
  trigger: React.ReactElement;
  items: DropdownMenuEntry[];
  /** The menu's name: the drawer's title on a phone (see `DropdownMenu.Content`). */
  title?: string;
  /** Show the title at the top of the desktop menu too. */
  showTitle?: boolean;
  side?: Side;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

/** Renders a list of entries; shared by the simple forms of Dropdown Menu and Context Menu.
 *  A `label` starts a group that runs until the next separator or label (Base UI needs labels
 *  inside `Menu.Group`). */
export function renderMenuEntries(items: DropdownMenuEntry[]) {
  const out: React.ReactNode[] = [];
  let group: { key: number; children: React.ReactNode[] } | null = null;
  const flush = () => {
    if (group) out.push(<DropdownMenuGroup key={`g${group.key}`}>{group.children}</DropdownMenuGroup>);
    group = null;
  };
  items.forEach((entry, i) => {
    if (entry.type === 'separator') {
      flush();
      out.push(<DropdownMenuSeparator key={i} />);
      return;
    }
    if (entry.type === 'label') {
      flush();
      group = { key: i, children: [<DropdownMenuGroupLabel key={i}>{entry.label}</DropdownMenuGroupLabel>] };
      return;
    }
    const node = (
      <DropdownMenuItem
        key={i}
        danger={entry.danger}
        disabled={entry.disabled}
        checked={entry.checked}
        render={entry.render}
        lang={entry.lang}
        onClick={entry.onClick}
      >
        {entry.icon}
        {entry.checked === undefined ? entry.label : <span className="flex-1">{entry.label}</span>}
        {entry.shortcut && <DropdownMenuShortcut>{entry.shortcut}</DropdownMenuShortcut>}
      </DropdownMenuItem>
    );
    if (group) (group as { children: React.ReactNode[] }).children.push(node);
    else out.push(node);
  });
  flush();
  return out;
}

/**
 * A menu opened by a button; on a phone (below `sm`) a bottom drawer of large rows.
 *   <DropdownMenu trigger={<Button>Options</Button>} title="Options" items={[{ label: 'Rename', shortcut: 'F2' }]} />
 * or compound: DropdownMenu.Root / Trigger / Content / Item / CheckboxItem / RadioGroup / RadioItem /
 * Group / GroupLabel / Separator / Shortcut / Sub / SubTrigger / SubContent.
 */
function DropdownMenuSimple({ trigger, items, title, showTitle, side, align, className, ...root }: DropdownMenuProps) {
  return (
    <DropdownMenuRoot {...root}>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent side={side} align={align} title={title} showTitle={showTitle} className={className}>
        {renderMenuEntries(items)}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}

export const DropdownMenu = Object.assign(DropdownMenuSimple, {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Group: DropdownMenuGroup,
  GroupLabel: DropdownMenuGroupLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
});
