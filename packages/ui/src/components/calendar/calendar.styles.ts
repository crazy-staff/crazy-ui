import { tv } from '../../lib/tv';

export const calendarStyles = tv({
  slots: {
    root: 'squircle relative inline-flex w-fit flex-col rounded-card border border-border bg-surface p-3 text-foreground select-none',
    nav: 'pointer-events-none absolute inset-x-3 top-3 z-10 flex items-center justify-between [&>*]:pointer-events-auto',
    navButton: 'text-muted hover:text-foreground rtl:[&_svg]:-scale-x-100',
    viewport: 'relative overflow-hidden',
    months: 'flex flex-col gap-4 sm:flex-row sm:gap-6',
    month: 'flex flex-col gap-2',
    caption: 'flex h-control-sm items-center justify-center px-10 text-sm font-medium whitespace-nowrap',
    grid: 'flex flex-col outline-none',
    weekdays: 'grid grid-cols-7',
    weekday: 'flex h-8 w-9 items-center justify-center text-xs font-normal text-muted',
    week: 'mt-0.5 grid grid-cols-7',
    cell: [
      'relative flex size-9 items-center justify-center p-0',
      // the range band lives on the cell so neighbouring days join into one strip
      'data-[band=middle]:bg-accent-soft',
      'first:data-[band=middle]:rounded-s-item last:data-[band=middle]:rounded-e-item',
      'data-[band=start]:bg-linear-to-r data-[band=start]:from-transparent data-[band=start]:from-50% data-[band=start]:to-accent-soft data-[band=start]:to-50%',
      'data-[band=end]:bg-linear-to-l data-[band=end]:from-transparent data-[band=end]:from-50% data-[band=end]:to-accent-soft data-[band=end]:to-50%',
      'rtl:data-[band=start]:bg-linear-to-l rtl:data-[band=end]:bg-linear-to-r',
    ],
    day: [
      'squircle relative flex size-9 cursor-default items-center justify-center rounded-item border border-transparent',
      'text-sm tabular-nums text-foreground outline-none',
      'transition-[background-color,color,scale] duration-[var(--cui-duration-fast)] ease-ui',
      '[&:not([data-selected],[data-range-edge],[data-disabled])]:hover:bg-hover',
      'focus-visible:border-accent active:scale-[var(--cui-press-scale)]',
      'data-[outside]:text-muted/70',
      'data-[today]:font-semibold data-[today]:text-accent-soft-foreground',
      'data-[today]:after:absolute data-[today]:after:bottom-1 data-[today]:after:size-1 data-[today]:after:rounded-full data-[today]:after:bg-current',
      'data-[range-middle]:text-accent-soft-foreground',
      'data-[selected]:bg-accent-soft data-[selected]:font-medium data-[selected]:text-accent-soft-foreground',
      'data-[range-edge]:bg-accent data-[range-edge]:font-medium data-[range-edge]:text-accent-foreground',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-muted data-[disabled]:line-through data-[disabled]:opacity-50 data-[disabled]:active:scale-100',
    ],
  },
});
