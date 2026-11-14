/**
 * The docs sidebar, ported from crazy-hub (which is based on the sidebar of Fumadocs' "spacious"
 * layout, MIT (c) Fuma): title row with the collapse button, a large search field, the page tree
 * with one gliding hover block. The theme switch sits top right in the page panel (where crazy-hub
 * has its account menu).
 * Collapsing hides the sidebar completely; the page panel then shows the open button.
 */
import { cn } from '@crazy-staff/ui';
import { ScrollArea } from '@base-ui/react/scroll-area';
import * as Base from 'fumadocs-ui/components/sidebar/base';
import { createPageTreeRenderer } from 'fumadocs-ui/components/sidebar/page-tree';
import { useSpaciousLayout } from 'fumadocs-ui/layouts/spacious';
import { SidebarIcon } from 'lucide-react';
import { Fragment, type ComponentProps } from 'react';
import { GLIDE_BLOCK_CLASS, glide } from './glide';
import { SearchButton } from './search-button';

/** One look for every row of the sidebar. */
export const sidebarItem = (active = false) =>
  cn(
    'squircle-motion relative my-0.5 flex w-full items-center gap-3 rounded-item px-2.5 py-2 text-start text-sm wrap-anywhere outline-none',
    'transition-colors duration-[var(--cui-duration-fast)] ease-ui focus-visible:ring-2 focus-visible:ring-ring',
    '[&_svg]:size-4 [&_svg]:shrink-0',
    active ? 'bg-accent-soft font-medium text-accent-soft-foreground' : 'text-muted hover:text-foreground',
  );

const sidebarLabel = 'mb-1.5 px-2.5 text-xs font-medium text-muted';

const iconButton =
  'squircle inline-flex size-8 items-center justify-center rounded-control-sm text-muted outline-none transition-colors hover:bg-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4';

const follow = (area: HTMLDivElement | null) => glide(area, { zoned: true });
const glideBlock = <div data-glide-block="" aria-hidden className={GLIDE_BLOCK_CLASS} />;

function TreeSeparator({ className, ...props }: ComponentProps<'p'>) {
  return (
    <Base.SidebarSeparator
      className={cn(sidebarLabel, 'mt-6 flex items-center gap-2 first:mt-0 [&_svg]:size-3.5 [&_svg]:shrink-0', className)}
      {...props}
    />
  );
}
function TreeItem({ active, className, children, ...props }: ComponentProps<typeof Base.SidebarItem>) {
  return (
    <Base.SidebarItem active={active} data-active={active} className={cn(sidebarItem(active), className)} {...props}>
      {children}
    </Base.SidebarItem>
  );
}
function TreeFolderTrigger(props: ComponentProps<typeof Base.SidebarFolderTrigger>) {
  return <Base.SidebarFolderTrigger {...props} className={cn(sidebarItem(), '[&>[data-icon]]:size-3.5')} />;
}
function TreeFolderLink({ active, className, children, ...props }: ComponentProps<typeof Base.SidebarFolderLink>) {
  return (
    <Base.SidebarFolderLink active={active} data-active={active} className={cn(sidebarItem(active), className)} {...props}>
      {children}
    </Base.SidebarFolderLink>
  );
}
function TreeFolderContent({ children, ...props }: ComponentProps<typeof Base.SidebarFolderContent>) {
  return (
    <Base.SidebarFolderContent {...props} className="relative ms-3 flex flex-col ps-1">
      <span className="absolute inset-y-1 start-0 w-px bg-border" />
      {children}
    </Base.SidebarFolderContent>
  );
}
const PageTree = createPageTreeRenderer({
  SidebarFolder: Base.SidebarFolder,
  SidebarFolderContent: TreeFolderContent,
  SidebarFolderLink: TreeFolderLink,
  SidebarFolderTrigger: TreeFolderTrigger,
  SidebarItem: TreeItem,
  SidebarSeparator: TreeSeparator,
});

function Search() {
  return (
    <div className="shrink-0 px-3">
      <SearchButton />
    </div>
  );
}

function Viewport() {
  return (
    <ScrollArea.Root className="min-h-0 flex-1">
      <ScrollArea.Viewport className="size-full overscroll-contain px-3 pt-4 pb-8 mask-t-from-[calc(100%-16px)] mask-b-from-[calc(100%-32px)]">
        <ScrollArea.Content className="flex flex-col" data-glide-zone="">
          <PageTree />
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={(s) => cn('flex w-1.5 select-none py-2 transition-opacity', !s.hovering && 'opacity-0')}>
        <ScrollArea.Thumb className="flex-1 rounded-full bg-border-strong" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  const { slots } = useSpaciousLayout();
  return (
    <div className="my-2 flex h-(--fd-header-height) shrink-0 items-center gap-2 ps-4 pe-3">
      <slots.navTitle className="me-auto inline-flex min-w-0 items-center gap-2.5 text-[0.9375rem] font-semibold" />
      {children}
    </div>
  );
}

export function Sidebar() {
  const { collapsed, mode } = Base.useSidebar();
  if (mode !== 'full') return null;
  return (
    <aside
      id="nd-sidebar"
      data-collapsed={collapsed}
      inert={collapsed}
      className={cn(
        '[grid-area:sidebar] flex min-h-0 overflow-clip text-sm md:layout:[--fd-sidebar-width:272px] max-md:hidden',
        collapsed && 'md:layout:[--fd-sidebar-col:--spacing(2)]',
      )}
    >
      <div
        ref={follow}
        className={cn(
          'relative flex w-(--fd-sidebar-width) shrink-0 flex-col transition-[opacity,translate] duration-300 ease-ui',
          collapsed && '-translate-x-3 opacity-0',
        )}
      >
        {glideBlock}
        <Title>
          <Base.SidebarCollapseTrigger className={iconButton} aria-label="Collapse sidebar">
            <SidebarIcon />
          </Base.SidebarCollapseTrigger>
        </Title>
        <Search />
        <Viewport />
      </div>
    </aside>
  );
}

export function SidebarDrawer() {
  return (
    <Fragment>
      <Base.SidebarDrawerOverlay className="fixed inset-0 z-40 backdrop-blur-xs data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out" />
      <Base.SidebarDrawerContent className="fixed inset-y-0 inset-e-0 z-40 flex w-[85%] max-w-95 flex-col border-s border-border bg-frame text-[0.9375rem] shadow-overlay data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out">
        <div ref={follow} className="relative flex min-h-0 flex-1 flex-col">
          {glideBlock}
          <Title>
            <Base.SidebarTrigger className={iconButton} aria-label="Close menu">
              <SidebarIcon />
            </Base.SidebarTrigger>
          </Title>
          <Search />
          <Viewport />
          </div>
      </Base.SidebarDrawerContent>
    </Fragment>
  );
}

export function SidebarProvider(props: Base.SidebarProviderProps) {
  return <Base.SidebarProvider {...props} />;
}

export const SIDEBAR_SLOTS = { provider: SidebarProvider, main: Sidebar, drawer: SidebarDrawer };
