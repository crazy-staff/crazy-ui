import { Menu } from '@base-ui/react/menu';
import { Check, ChevronRight, Dot } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { menuStyles } from './dropdown-menu.styles';

const styles = menuStyles();

type Side = 'top' | 'right' | 'bottom' | 'left' | 'inline-start' | 'inline-end';

export interface DropdownMenuContentProps extends React.ComponentPropsWithRef<typeof Menu.Popup> {
  side?: Side;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  classNames?: { positioner?: string; popup?: string };
}

function DropdownMenuContent({
  side = 'bottom',
  align = 'start',
  sideOffset = 6,
  className,
  classNames,
  ...props
}: DropdownMenuContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner side={side} align={align} sideOffset={sideOffset} className={cn(styles.positioner(), classNames?.positioner)}>
        <Menu.Popup className={cn(styles.popup(), classNames?.popup, className)} {...props} />
      </Menu.Positioner>
    </Menu.Portal>
  );
}

export interface DropdownMenuItemProps extends React.ComponentPropsWithRef<typeof Menu.Item> {
  /** Paint the item in the danger colour (delete, sign out …). */
  danger?: boolean;
}

function DropdownMenuItem({ danger, className, ...props }: DropdownMenuItemProps) {
  return <Menu.Item className={cn(styles.item(), danger && styles.danger(), className)} {...props} />;
}

function DropdownMenuCheckboxItem({ className, children, ...props }: React.ComponentPropsWithRef<typeof Menu.CheckboxItem>) {
  return (
    <Menu.CheckboxItem className={cn(styles.item(), className)} {...props}>
      <span className={styles.indicator()}>
        <Menu.CheckboxItemIndicator>
          <Check />
        </Menu.CheckboxItemIndicator>
      </span>
      {children}
    </Menu.CheckboxItem>
  );
}

function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentPropsWithRef<typeof Menu.RadioItem>) {
  return (
    <Menu.RadioItem className={cn(styles.item(), className)} {...props}>
      <span className={styles.indicator()}>
        <Menu.RadioItemIndicator>
          <Dot className="size-6!" />
        </Menu.RadioItemIndicator>
      </span>
      {children}
    </Menu.RadioItem>
  );
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentPropsWithRef<typeof Menu.Separator>) {
  return <Menu.Separator className={cn(styles.separator(), className)} {...props} />;
}

function DropdownMenuGroupLabel({ className, ...props }: React.ComponentPropsWithRef<typeof Menu.GroupLabel>) {
  return <Menu.GroupLabel className={cn(styles.groupLabel(), className)} {...props} />;
}

/** A keyboard hint at the end of an item, e.g. `Ctrl K`. */
function DropdownMenuShortcut({ className, ...props }: React.ComponentPropsWithRef<'kbd'>) {
  return <kbd className={cn(styles.shortcut(), className)} {...props} />;
}

function DropdownMenuSubTrigger({ className, children, ...props }: React.ComponentPropsWithRef<typeof Menu.SubmenuTrigger>) {
  return (
    <Menu.SubmenuTrigger className={cn(styles.item(), 'data-[popup-open]:bg-hover', className)} {...props}>
      {children}
      <ChevronRight className={styles.subChevron()} />
    </Menu.SubmenuTrigger>
  );
}

function DropdownMenuSubContent(props: DropdownMenuContentProps) {
  return <DropdownMenuContent side="inline-end" align="start" sideOffset={4} {...props} />;
}

export type DropdownMenuEntry =
  | { type?: 'item'; label: React.ReactNode; icon?: React.ReactNode; shortcut?: string; danger?: boolean; disabled?: boolean; onClick?: () => void }
  | { type: 'separator' }
  | { type: 'label'; label: React.ReactNode };

export interface DropdownMenuProps extends Omit<React.ComponentProps<typeof Menu.Root>, 'children'> {
  /** The button that opens the menu. */
  trigger: React.ReactElement;
  items: DropdownMenuEntry[];
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
    if (group) out.push(<Menu.Group key={`g${group.key}`}>{group.children}</Menu.Group>);
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
      <DropdownMenuItem key={i} danger={entry.danger} disabled={entry.disabled} onClick={entry.onClick}>
        {entry.icon}
        {entry.label}
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
 * A menu opened by a button.
 *   <DropdownMenu trigger={<Button>Options</Button>} items={[{ label: 'Rename', shortcut: 'F2' }]} />
 * or compound: DropdownMenu.Root / Trigger / Content / Item / CheckboxItem / RadioGroup / RadioItem /
 * Group / GroupLabel / Separator / Shortcut / Sub / SubTrigger / SubContent.
 */
function DropdownMenuSimple({ trigger, items, side, align, className, ...root }: DropdownMenuProps) {
  return (
    <Menu.Root {...root}>
      <Menu.Trigger render={trigger} />
      <DropdownMenuContent side={side} align={align} className={className}>
        {renderMenuEntries(items)}
      </DropdownMenuContent>
    </Menu.Root>
  );
}

export const DropdownMenu = Object.assign(DropdownMenuSimple, {
  Root: Menu.Root,
  Trigger: Menu.Trigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: Menu.RadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Group: Menu.Group,
  GroupLabel: DropdownMenuGroupLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Sub: Menu.SubmenuRoot,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
});
