import { tv } from '../../lib/tv';

/** The data table is our Table plus a toolbar (search, column menu) and a footer (selection, pages). */
export const dataTableStyles = tv({
  slots: {
    root: 'flex w-full flex-col gap-3',
    toolbar: 'flex flex-wrap items-center gap-2',
    search: 'w-full max-w-xs',
    sortButton: [
      'squircle -mx-2 inline-flex h-7 items-center gap-1.5 rounded-control-sm px-2 text-xs font-medium text-muted outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:bg-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
      'data-[sorted]:text-foreground [&_svg]:size-3.5 [&_svg]:shrink-0',
    ],
    sortIcon: 'text-muted/70 transition-transform duration-[var(--cui-duration-fast)] ease-ui',
    selectCell: 'pe-0 [&+*]:border-s-0!',
    selectedRow: 'bg-accent-soft hover:bg-accent-soft',
    empty: 'h-24 text-center text-muted',
    footer: 'flex flex-wrap items-center justify-between gap-x-4 gap-y-2',
    count: 'text-sm text-muted tabular-nums',
  },
});
