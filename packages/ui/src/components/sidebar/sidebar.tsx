import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { PanelLeft } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { Button, type ButtonProps } from '../button/button';
import { glideBlockClass, useGlide } from './glide';
import { sidebarStyles } from './sidebar.styles';

const s = sidebarStyles();
/** Below this width the sidebar is a drawer (Tailwind's `md`). */
const MOBILE_QUERY = '(max-width: 767px)';

interface SidebarContextValue {
  /** Desktop: the sidebar is shown. */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Phone: the drawer is shown. */
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  /** Opens/closes the drawer on a phone, the sidebar otherwise. */
  toggle: () => void;
  id: string;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

/** The sidebar state inside `Sidebar.Provider`: `{ open, setOpen, openMobile, setOpenMobile, toggle }`. */
export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used inside <Sidebar.Provider>');
  return ctx;
}

const isMobile = () => typeof window !== 'undefined' && window.matchMedia?.(MOBILE_QUERY).matches;

export interface SidebarProviderProps extends React.ComponentPropsWithRef<'div'> {
  /** Desktop open state (controlled). */
  open?: boolean;
  /** @default true */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Toggle with Ctrl/⌘ + this key; `false` turns the shortcut off. @default 'b' */
  shortcut?: string | false;
  /** Sidebar width, any CSS length. @default '16rem' */
  width?: string;
}

/** Holds the open state and lays out the sidebar next to `Sidebar.Inset` on the frame colour. */
function SidebarProvider({
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  shortcut = 'b',
  width,
  className,
  style,
  ...props
}: SidebarProviderProps) {
  const [openState, setOpenState] = React.useState(defaultOpen);
  const [openMobile, setOpenMobile] = React.useState(false);
  const open = openProp ?? openState;
  const id = React.useId();
  const setOpen = React.useCallback(
    (next: boolean) => {
      setOpenState(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );
  const toggle = React.useCallback(() => (isMobile() ? setOpenMobile((o) => !o) : setOpen(!open)), [open, setOpen]);

  React.useEffect(() => {
    if (!shortcut) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === shortcut && (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey) {
        event.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shortcut, toggle]);

  return (
    <SidebarContext.Provider value={{ open, setOpen, openMobile, setOpenMobile, toggle, id }}>
      <div
        data-sidebar={open ? 'open' : 'collapsed'}
        className={cn(s.provider(), className)}
        style={width ? ({ '--sidebar-width': width, ...style } as React.CSSProperties) : style}
        {...props}
      />
    </SidebarContext.Provider>
  );
}

/** The column with the gliding hover block; shared by the desktop sidebar and the drawer. */
function SidebarArea({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useGlide<HTMLDivElement>();
  return (
    <div ref={ref} className={cn(s.area(), className)}>
      <div data-glide-block="" aria-hidden className={glideBlockClass} />
      {children}
    </div>
  );
}

export interface SidebarProps extends React.ComponentPropsWithRef<'aside'> {
  /** Name of the navigation landmark. @default 'Sidebar' */
  label?: string;
  classNames?: { column?: string; drawer?: string; backdrop?: string };
}

/**
 * The sidebar: an `<aside>` on desktop that collapses completely, and a drawer from the left on phones
 * (opened by `Sidebar.Trigger`). Its children are rendered in whichever is shown.
 */
function SidebarRoot({ label = 'Sidebar', className, classNames, children, ...props }: SidebarProps) {
  const { open, openMobile, setOpenMobile, id } = useSidebar();
  return (
    <>
      <aside
        id={id}
        aria-label={label}
        data-state={open ? 'open' : 'collapsed'}
        inert={!open}
        className={cn(s.aside(), className)}
        {...props}
      >
        <div className={cn(s.column(), classNames?.column)}>
          <SidebarArea>{children}</SidebarArea>
        </div>
      </aside>
      <BaseDialog.Root open={openMobile} onOpenChange={setOpenMobile}>
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className={cn(s.backdrop(), classNames?.backdrop)} />
          <BaseDialog.Popup aria-label={label} className={cn(s.drawer(), classNames?.drawer)}>
            <SidebarArea>{children}</SidebarArea>
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    </>
  );
}

/**
 * The top row (title, trigger). Its controls keep their own hover: the gliding block is for the rows
 * only, it never jumps up onto the title or the trigger (as in the docs sidebar).
 */
const SidebarHeader = ({ className, ...p }: React.ComponentPropsWithRef<'div'>) => (
  <div data-no-glide-area="" className={cn(s.header(), className)} {...p} />
);
const SidebarFooter = ({ className, ...p }: React.ComponentPropsWithRef<'div'>) => <div className={cn(s.footer(), className)} {...p} />;
const SidebarSeparator = ({ className, ...p }: React.ComponentPropsWithRef<'div'>) => (
  <div role="separator" className={cn(s.separator(), className)} {...p} />
);

/** The scrolling middle part with the groups. */
function SidebarContent({ className, ...props }: React.ComponentPropsWithRef<'nav'>) {
  return <nav className={cn(s.content(), className)} {...props} />;
}

export interface SidebarGroupProps extends Omit<React.ComponentPropsWithRef<'div'>, 'title'> {
  /** The small heading above the rows. */
  label?: React.ReactNode;
  classNames?: { label?: string; list?: string };
}

/** A labelled group of rows. Each child becomes a list item. */
function SidebarGroup({ label, className, classNames, children, ...props }: SidebarGroupProps) {
  const labelId = React.useId();
  return (
    <div role="group" aria-labelledby={label ? labelId : undefined} className={cn(s.group(), className)} {...props}>
      {label && (
        <div id={labelId} className={cn(s.groupLabel(), classNames?.label)}>
          {label}
        </div>
      )}
      <SidebarList className={classNames?.list}>{children}</SidebarList>
    </div>
  );
}

function SidebarList({ className, children, ...props }: React.ComponentPropsWithRef<'ul'>) {
  return (
    <ul className={cn(s.list(), className)} {...props}>
      {React.Children.map(children, (child) => (child == null || child === false ? null : <li>{child}</li>))}
    </ul>
  );
}

const SidebarGroupLabel = ({ className, ...p }: React.ComponentPropsWithRef<'div'>) => <div className={cn(s.groupLabel(), className)} {...p} />;

export interface SidebarItemProps extends useRender.ComponentProps<'a'> {
  icon?: React.ReactNode;
  /** The current page: soft accent fill, `aria-current="page"`. */
  active?: boolean;
  /** Text at the end of the row (a count, a shortcut). */
  badge?: React.ReactNode;
  disabled?: boolean;
}

/**
 * A row. Renders a link; `render={<Link to="…" />}` for a router link or `render={<button />}` for an
 * action. On a phone, choosing a row closes the drawer.
 */
function SidebarItem({ icon, active = false, badge, disabled, className, render, children, onClick, ...props }: SidebarItemProps) {
  const ctx = React.useContext(SidebarContext);
  return useRender({
    defaultTagName: 'a',
    render,
    props: mergeProps<'a'>(
      {
        className: cn(s.item(), className),
        'data-active': active,
        'aria-current': active ? 'page' : undefined,
        'aria-disabled': disabled || undefined,
        onClick: (event) => {
          onClick?.(event);
          if (!event.defaultPrevented && ctx?.openMobile) ctx.setOpenMobile(false);
        },
        children: (
          <>
            {icon}
            <span className="min-w-0 flex-1 truncate">{children}</span>
            {badge != null && <span className={s.badge()}>{badge}</span>}
          </>
        ),
      } as React.ComponentProps<'a'>,
      props,
    ),
  });
}

/** Nested rows under an item, with a guide line. */
function SidebarSub({ className, children, ...props }: React.ComponentPropsWithRef<'ul'>) {
  return (
    <SidebarList className={cn(s.sub(), className)} {...props}>
      {children}
    </SidebarList>
  );
}

/** Opens and closes the sidebar (the drawer on a phone). */
function SidebarTrigger({ className, onClick, children, ...props }: ButtonProps) {
  const { open, openMobile, toggle, id } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={open ? 'Collapse sidebar' : 'Open sidebar'}
      aria-controls={id}
      aria-expanded={isMobile() ? openMobile : open}
      className={cn(s.trigger(), className)}
      onClick={(event) => {
        onClick?.(event);
        toggle();
      }}
      {...props}
    >
      {children ?? <PanelLeft />}
    </Button>
  );
}

/** The page panel next to the sidebar (rounded, on the background colour). */
function SidebarInset({ className, ...props }: React.ComponentPropsWithRef<'main'>) {
  return <main className={cn(s.inset(), className)} {...props} />;
}

/**
 * The app sidebar of crazy-hub.
 *   <Sidebar.Provider>
 *     <Sidebar>
 *       <Sidebar.Header>…</Sidebar.Header>
 *       <Sidebar.Content>
 *         <Sidebar.Group label="Feedback">
 *           <Sidebar.Item href="/ideas" icon={<Lightbulb />} active>Ideas</Sidebar.Item>
 *         </Sidebar.Group>
 *       </Sidebar.Content>
 *     </Sidebar>
 *     <Sidebar.Inset><Sidebar.Trigger /> …</Sidebar.Inset>
 *   </Sidebar.Provider>
 */
export const Sidebar = Object.assign(SidebarRoot, {
  Provider: SidebarProvider,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Separator: SidebarSeparator,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  List: SidebarList,
  Item: SidebarItem,
  Sub: SidebarSub,
  Trigger: SidebarTrigger,
  Inset: SidebarInset,
});
