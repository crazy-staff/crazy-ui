import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { glideBlockClass, useGlide } from '../sidebar/glide';
import { tabsStyles } from './tabs.styles';

type Options = Pick<VariantProps<typeof tabsStyles>, 'variant' | 'size' | 'accent'>;
const OptionsContext = React.createContext<Options>({});
const useStyles = () => tabsStyles(React.useContext(OptionsContext));

export interface TabsRootProps extends React.ComponentPropsWithRef<typeof BaseTabs.Root> {
  /** `pill`: a soft fill glides behind the active tab. `line`: an underline glides under it. @default 'pill' */
  variant?: 'pill' | 'line';
  /** @default 'md' */
  size?: 'sm' | 'md';
  /** Mark the active tab with the soft accent; `false` uses a neutral fill. @default true */
  accent?: boolean;
}

function TabsRoot({ className, variant = 'pill', size = 'md', accent = true, ...props }: TabsRootProps) {
  const options = React.useMemo(() => ({ variant, size, accent }), [variant, size, accent]);
  return (
    <OptionsContext.Provider value={options}>
      <BaseTabs.Root className={cn(tabsStyles(options).root(), className)} {...props} />
    </OptionsContext.Provider>
  );
}

export interface TabsListProps extends React.ComponentPropsWithRef<typeof BaseTabs.List> {
  classNames?: { list?: string; indicator?: string; hover?: string };
}

/**
 * The tab row. Two blocks glide in it: the active fill (or underline) follows the selected tab, and
 * one neutral hover block follows the mouse or keyboard focus. The hover block hides on the active tab
 * and never starts its slide from it (same behaviour as the sidebar).
 */
function TabsList({ className, classNames, children, ref, ...props }: TabsListProps) {
  const s = useStyles();
  const glideRef = useGlide<HTMLDivElement>();
  const refs = React.useCallback(
    (node: HTMLDivElement | null) => {
      glideRef(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [glideRef, ref],
  );
  return (
    <BaseTabs.List ref={refs} className={cn(s.list(), classNames?.list, className)} {...props}>
      <span data-glide-block aria-hidden className={cn(glideBlockClass, s.hover(), classNames?.hover)} />
      {children}
      <BaseTabs.Indicator className={cn(s.indicator(), classNames?.indicator)} />
    </BaseTabs.List>
  );
}

function TabsTab({ className, ...props }: React.ComponentPropsWithRef<typeof BaseTabs.Tab>) {
  return <BaseTabs.Tab className={cn(useStyles().tab(), className)} {...props} />;
}

/** The content of one tab. The new panel fades and rises in when the tab changes. */
function TabsPanel({ className, ...props }: React.ComponentPropsWithRef<typeof BaseTabs.Panel>) {
  return <BaseTabs.Panel className={cn(useStyles().panel(), className)} {...props} />;
}

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<TabsRootProps, 'children'> {
  items: TabItem[];
  classNames?: { list?: string; tab?: string; indicator?: string; hover?: string; panel?: string };
}

/** One-line form: `<Tabs items={[{ value, label, content }]} />`. */
function TabsSimple({ items, classNames, defaultValue, ...props }: TabsProps) {
  return (
    <TabsRoot defaultValue={defaultValue ?? items[0]?.value} {...props}>
      <TabsList classNames={{ list: classNames?.list, indicator: classNames?.indicator, hover: classNames?.hover }}>
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
