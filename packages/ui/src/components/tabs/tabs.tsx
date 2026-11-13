import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { tabsStyles } from './tabs.styles';

type Variant = VariantProps<typeof tabsStyles>['variant'];
const VariantContext = React.createContext<Variant>('pill');

export interface TabsRootProps extends React.ComponentPropsWithRef<typeof BaseTabs.Root> {
  variant?: Variant;
}

function TabsRoot({ className, variant = 'pill', ...props }: TabsRootProps) {
  return (
    <VariantContext.Provider value={variant}>
      <BaseTabs.Root className={cn(tabsStyles().root(), className)} {...props} />
    </VariantContext.Provider>
  );
}

export interface TabsListProps extends React.ComponentPropsWithRef<typeof BaseTabs.List> {
  classNames?: { list?: string; indicator?: string };
}

/** The tab row; includes the gliding indicator. */
function TabsList({ className, classNames, children, ...props }: TabsListProps) {
  const s = tabsStyles({ variant: React.useContext(VariantContext) });
  return (
    <BaseTabs.List className={cn(s.list(), classNames?.list, className)} {...props}>
      {children}
      <BaseTabs.Indicator className={cn(s.indicator(), classNames?.indicator)} />
    </BaseTabs.List>
  );
}

function TabsTab({ className, ...props }: React.ComponentPropsWithRef<typeof BaseTabs.Tab>) {
  const s = tabsStyles({ variant: React.useContext(VariantContext) });
  return <BaseTabs.Tab className={cn(s.tab(), className)} {...props} />;
}

function TabsPanel({ className, ...props }: React.ComponentPropsWithRef<typeof BaseTabs.Panel>) {
  return <BaseTabs.Panel className={cn(tabsStyles().panel(), className)} {...props} />;
}

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<TabsRootProps, 'children'> {
  items: TabItem[];
  classNames?: { list?: string; tab?: string; indicator?: string; panel?: string };
}

/** One-line form: `<Tabs items={[{ value, label, content }]} />`. */
function TabsSimple({ items, classNames, defaultValue, ...props }: TabsProps) {
  return (
    <TabsRoot defaultValue={defaultValue ?? items[0]?.value} {...props}>
      <TabsList classNames={{ list: classNames?.list, indicator: classNames?.indicator }}>
        {items.map((i) => (
          <TabsTab key={i.value} value={i.value} disabled={i.disabled} className={classNames?.tab}>
            {i.label}
          </TabsTab>
        ))}
      </TabsList>
      {items.map((i) => (
        <TabsPanel key={i.value} value={i.value} className={classNames?.panel}>
          {i.content}
        </TabsPanel>
      ))}
    </TabsRoot>
  );
}

export const Tabs = Object.assign(TabsSimple, {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
});
