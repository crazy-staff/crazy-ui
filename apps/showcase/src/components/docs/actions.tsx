import { HeaderActions } from 'fumadocs-ui/layouts/spacious/slots/actions';
import * as Base from 'fumadocs-ui/components/sidebar/base';
import type { ComponentProps } from 'react';
import { ThemeToggle } from './theme-toggle';
import { SearchButton } from './search-button';

/**
 * Top right of the page panel: theme switch and GitHub (crazy-hub puts its account menu here);
 * with the sidebar hidden it also offers the search.
 */
export function Actions(props: ComponentProps<'div'>) {
  const { collapsed } = Base.useSidebar();
  return (
    <div className={props.className ? `flex items-center gap-1 ${props.className}` : 'flex items-center gap-1'}>
      {collapsed && <SearchButton className="h-9 w-56 max-md:hidden" />}
      <ThemeToggle />
      <HeaderActions />
    </div>
  );
}
