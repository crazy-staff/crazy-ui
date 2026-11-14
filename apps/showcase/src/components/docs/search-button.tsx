import { Kbd, cn } from '@crazy-staff/ui';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { Search } from 'lucide-react';

/** Opens the docs search (Ctrl/Cmd+K). Same shape and radius as the sidebar rows. */
export function SearchButton({ className }: { className?: string }) {
  const { setOpenSearch } = useSearchContext();
  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className={cn(
        'squircle flex h-10 w-full items-center gap-2.5 rounded-item border border-border bg-surface-2/50 ps-3 pe-2 text-sm text-muted outline-none',
        'transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:bg-hover hover:text-foreground focus-visible:border-accent',
        className,
      )}
    >
      <Search className="size-4 shrink-0" />
      <span className="flex-1 text-start">Search</span>
      <span className="flex gap-1">
        <Kbd size="sm">Ctrl</Kbd>
        <Kbd size="sm">K</Kbd>
      </span>
    </button>
  );
}
