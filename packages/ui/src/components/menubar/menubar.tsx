import { Menu } from '@base-ui/react/menu';
import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { DropdownMenu, type DropdownMenuEntry, renderMenuEntries } from '../dropdown-menu/dropdown-menu';
import { menubarStyles } from './menubar.styles';

const styles = menubarStyles();
type Props<C extends React.ElementType> = Omit<React.ComponentPropsWithRef<C>, 'className'> & { className?: string };

function MenubarRoot({ className, ...props }: Props<typeof BaseMenubar>) {
  return <BaseMenubar className={cn(styles.root(), className)} {...props} />;
}

/** A top-level button of the bar; opens its menu. */
function MenubarTrigger({ className, ...props }: Props<typeof Menu.Trigger>) {
  return <Menu.Trigger className={cn(styles.trigger(), className)} {...props} />;
}

export interface MenubarMenuData {
  label: React.ReactNode;
  items: DropdownMenuEntry[];
  disabled?: boolean;
}

export interface MenubarProps extends Omit<Props<typeof BaseMenubar>, 'children'> {
  /** The menus, left to right. Items use the Dropdown Menu entry format. */
  menus: MenubarMenuData[];
  classNames?: { root?: string; trigger?: string; popup?: string };
}

/**
 * A row of menus, like the one at the top of a desktop app. Arrow keys move between menus.
 *   <Menubar menus={[{ label: 'File', items: [{ label: 'Save', shortcut: 'Ctrl S' }] }]} />
 * Compound: Menubar.Root / Menu / Trigger / Content / Item / CheckboxItem / RadioGroup / RadioItem /
 * Group / GroupLabel / Separator / Shortcut / Sub / SubTrigger / SubContent (the Dropdown Menu parts).
 */
function MenubarSimple({ menus, className, classNames, ...props }: MenubarProps) {
  return (
    <MenubarRoot className={cn(classNames?.root, className)} {...props}>
      {menus.map((m, i) => (
        <Menu.Root key={i}>
          <MenubarTrigger disabled={m.disabled} className={classNames?.trigger}>
            {m.label}
          </MenubarTrigger>
          <DropdownMenu.Content className={classNames?.popup}>{renderMenuEntries(m.items)}</DropdownMenu.Content>
        </Menu.Root>
      ))}
    </MenubarRoot>
  );
}

export const Menubar = Object.assign(MenubarSimple, {
  Root: MenubarRoot,
  Menu: Menu.Root,
  Trigger: MenubarTrigger,
  Content: DropdownMenu.Content,
  Item: DropdownMenu.Item,
  CheckboxItem: DropdownMenu.CheckboxItem,
  RadioGroup: DropdownMenu.RadioGroup,
  RadioItem: DropdownMenu.RadioItem,
  Group: DropdownMenu.Group,
  GroupLabel: DropdownMenu.GroupLabel,
  Separator: DropdownMenu.Separator,
  Shortcut: DropdownMenu.Shortcut,
  Sub: DropdownMenu.Sub,
  SubTrigger: DropdownMenu.SubTrigger,
  SubContent: DropdownMenu.SubContent,
});
