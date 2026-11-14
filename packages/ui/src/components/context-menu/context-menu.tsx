import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { DropdownMenu, type DropdownMenuEntry, renderMenuEntries } from '../dropdown-menu/dropdown-menu';
import { contextMenuStyles } from './context-menu.styles';

const styles = contextMenuStyles();

export interface ContextMenuContentProps extends React.ComponentPropsWithRef<typeof BaseContextMenu.Popup> {
  classNames?: { positioner?: string; popup?: string };
}

function ContextMenuContent({ className, classNames, ...props }: ContextMenuContentProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner className={cn(styles.positioner(), classNames?.positioner)}>
        <BaseContextMenu.Popup className={cn(styles.popup(), classNames?.popup, className)} {...props} />
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}

function ContextMenuTrigger({ className, ...props }: React.ComponentPropsWithRef<typeof BaseContextMenu.Trigger>) {
  return <BaseContextMenu.Trigger className={cn(styles.area(), className)} {...props} />;
}

export interface ContextMenuProps extends Omit<React.ComponentProps<typeof BaseContextMenu.Root>, 'children'> {
  items: DropdownMenuEntry[];
  /** The area that opens the menu on right click (or long press). */
  children: React.ReactNode;
  className?: string;
}

/**
 * A menu on right click.
 *   <ContextMenu items={[{ label: 'Copy', shortcut: 'Ctrl C' }]}><div>…</div></ContextMenu>
 * Compound parts share Dropdown Menu's items: ContextMenu.Item, .Separator, .Shortcut …
 */
function ContextMenuSimple({ items, children, className, ...root }: ContextMenuProps) {
  return (
    <BaseContextMenu.Root {...root}>
      <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
      <ContextMenuContent>{renderMenuEntries(items)}</ContextMenuContent>
    </BaseContextMenu.Root>
  );
}

export const ContextMenu = Object.assign(ContextMenuSimple, {
  Root: BaseContextMenu.Root,
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: DropdownMenu.Item,
  CheckboxItem: DropdownMenu.CheckboxItem,
  RadioGroup: DropdownMenu.RadioGroup,
  RadioItem: DropdownMenu.RadioItem,
  Group: DropdownMenu.Group,
  GroupLabel: DropdownMenu.GroupLabel,
  Separator: DropdownMenu.Separator,
  Shortcut: DropdownMenu.Shortcut,
});
