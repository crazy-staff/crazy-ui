import { HeaderActions } from 'fumadocs-ui/layouts/spacious/slots/actions';
import * as Base from 'fumadocs-ui/components/sidebar/base';
import { useSpaciousLayout } from 'fumadocs-ui/layouts/spacious';
import type { ComponentProps } from 'react';
import { ThemeToggle } from './theme-toggle';

/**
 * Top right of the page panel: theme switch and GitHub (crazy-hub puts its account menu here);
 * with the sidebar hidden it also offers the search.
 */
export function Actions(props: ComponentProps<'div'>) {
  const { collapsed } = Base.useSidebar();
  const { slots } = useSpaciousLayout();
  return (
    <div className={props.className ? `flex items-center gap-1 ${props.className}` : 'flex items-center gap-1'}>
      {collapsed && slots.searchTrigger && (
        <slots.searchTrigger.full
          hideIfDisabled
          className="squircle h-9 w-56 gap-3 rounded-control-sm border-border bg-background/60 ps-3 pe-2 text-muted max-md:hidden"
        />
      )}
      <ThemeToggle />
      <HeaderActions />
    </div>
  );
}
