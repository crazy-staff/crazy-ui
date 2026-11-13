import { Button, Chip, cn } from '@crazy-staff/ui';
import { AnimatePresence, motion } from 'motion/react';
import { PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react';
import * as React from 'react';
import { type NavGroup } from './nav';

const SPRING = { type: 'spring', stiffness: 520, damping: 40 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The crazy-hub frame: the sidebar sits on the frame colour, the page in a rounded squircle
 * panel next to it. The sidebar collapses to an icon rail; its rows share one gliding highlight.
 */
export function AppShell({
  groups,
  active,
  children,
}: {
  groups: NavGroup[];
  active: string;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-dvh bg-frame text-foreground">
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 76 : 272 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="sticky top-0 flex h-dvh shrink-0 flex-col overflow-hidden"
      >
        <SidebarHeader collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <SearchField collapsed={collapsed} />
        <SidebarNav groups={groups} active={active} collapsed={collapsed} />
        <div className={cn('mt-auto px-4 pb-4 text-[0.6875rem] text-muted', collapsed && 'sr-only')}>
          crazy-ui · design round 1b
        </div>
      </motion.aside>

      <div className="min-w-0 flex-1 py-2 pr-2">
        <main className="squircle relative min-h-[calc(100dvh-1rem)] overflow-hidden rounded-panel border border-border bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

function FadeLabel({ show, children, className }: { show: boolean; children: React.ReactNode; className?: string }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.2, ease: EASE }}
          className={cn('truncate whitespace-nowrap', className)}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function SidebarHeader({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <div className={cn('flex h-16 shrink-0 items-center gap-3 px-4', collapsed && 'flex-col justify-center gap-2 h-auto py-4')}>
      <span className="squircle flex size-9 shrink-0 items-center justify-center rounded-control-sm bg-accent text-sm font-extrabold text-accent-foreground shadow-button">
        C
      </span>
      <FadeLabel show={!collapsed} className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="text-sm font-bold tracking-[-0.01em]">crazy-ui</span>
        <span className="text-[0.6875rem] text-muted">design system</span>
      </FadeLabel>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="text-muted hover:text-foreground"
      >
        {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
      </Button>
    </div>
  );
}

function SearchField({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="px-3 pb-2">
      <button
        type="button"
        title="Search"
        className={cn(
          'squircle flex h-control-sm w-full items-center gap-2.5 rounded-control-sm border border-border bg-background/60 px-3 text-sm text-muted',
          'transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:bg-hover hover:text-foreground',
          collapsed && 'justify-center px-0',
        )}
      >
        <Search className="size-4 shrink-0" />
        <FadeLabel show={!collapsed} className="flex flex-1 items-center justify-between">
          <span>Search</span>
          <span className="flex gap-1">
            <Chip variant="outline" size="sm" className="font-mono">
              Ctrl
            </Chip>
            <Chip variant="outline" size="sm" className="font-mono">
              K
            </Chip>
          </span>
        </FadeLabel>
      </button>
    </div>
  );
}

function SidebarNav({ groups, active, collapsed }: { groups: NavGroup[]; active: string; collapsed: boolean }) {
  const [hover, setHover] = React.useState<string | null>(null);
  const shown = hover ?? active;

  return (
    <nav className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-3 pt-2 pb-4" onMouseLeave={() => setHover(null)}>
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-0.5">
          <div className="flex h-6 items-center px-3 text-xs font-medium text-muted">
            {collapsed ? <span className="mx-auto h-px w-5 bg-border-strong" /> : group.label}
          </div>
          {group.items.map((item) => {
            const isShown = shown === item.id;
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                title={collapsed ? item.label : undefined}
                onMouseEnter={() => setHover(item.id)}
                onFocus={() => setHover(item.id)}
                onBlur={() => setHover(null)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative flex h-10 items-center gap-3 rounded-item px-3 text-sm outline-none',
                  'transition-colors duration-[var(--cui-duration-fast)] ease-ui focus-visible:ring-2 focus-visible:ring-ring',
                  isShown || isActive ? 'text-accent-soft-foreground' : 'text-muted hover:text-foreground',
                  isActive && 'font-semibold',
                  collapsed && 'justify-center px-0',
                )}
              >
                {isShown && (
                  <motion.span
                    layoutId="sidebar-glide"
                    transition={SPRING}
                    className="squircle absolute inset-0 rounded-item bg-accent-soft"
                  />
                )}
                <item.icon className="relative size-4 shrink-0" />
                <FadeLabel show={!collapsed} className="relative flex-1">
                  {item.label}
                </FadeLabel>
                {isActive && !collapsed && <span className="relative size-1.5 rounded-full bg-accent" />}
              </a>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
