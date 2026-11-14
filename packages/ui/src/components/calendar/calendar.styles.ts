import { tv } from '../../lib/tv';

/**
 * Days are 2.5rem buttons inside 2.75rem cells (2 / 2.25rem on phones), so there is air around every day. A range is one soft
 * band per week row (a single element, so no seams between cells) with rounded ends; the picked ends are
 * solid accent days inside it, their radius concentric with the band's (band = day radius + 2px inset).
 */
export const calendarStyles = tv({
  slots: {
    root: 'squircle relative inline-flex w-fit flex-col rounded-card border border-border bg-surface p-2.5 text-foreground sm:p-4 select-none',
    nav: 'absolute end-2.5 top-2.5 z-10 sm:end-4 sm:top-4 flex items-center gap-1',
    navButton: 'border-border text-muted hover:text-foreground rtl:[&_svg]:-scale-x-100',
    viewport: 'relative overflow-hidden',
    months: 'flex flex-col gap-6 sm:flex-row sm:gap-8',
    month: 'flex flex-col gap-3',
    caption: 'flex h-control-sm items-baseline gap-1.5 self-start ps-2 pe-20 leading-[var(--spacing-control-sm)] whitespace-nowrap',
    captionMonth: 'text-base font-semibold tracking-[var(--cui-heading-tracking)] text-foreground',
    captionYear: 'text-base font-normal text-muted',
    grid: 'flex flex-col gap-0.5 outline-none',
    weekdays: 'grid grid-cols-7 pb-1',
    weekday: 'flex h-7 w-9 items-center justify-center text-xs font-medium text-muted sm:w-11',
    week: 'relative grid grid-cols-7',
    cell: 'relative flex size-9 items-center justify-center p-0.5 sm:size-11',
    // one strip per week row, placed by --band-from / --band-span (columns), drawn under the days
    band: [
      'squircle pointer-events-none absolute inset-y-0 rounded-[calc(var(--radius-control-sm)+2px)] bg-accent-soft',
      'start-[calc(var(--band-from)*100%/7)] w-[calc(var(--band-span)*100%/7)]',
    ],
    day: [
      'squircle relative flex size-8 cursor-default items-center justify-center rounded-control-sm border border-transparent sm:size-10',
      'text-sm tabular-nums text-foreground outline-none',
      'transition-[background-color,color,scale] duration-[var(--cui-duration-fast)] ease-ui',
      '[&:not([data-selected],[data-range-edge],[data-disabled])]:hover:bg-hover',
      'focus-visible:border-accent active:scale-[var(--cui-press-scale)]',
      'data-[outside]:text-muted/60',
      // today: bold with a dot. The dot takes the text colour, so it is readable on every fill; the
      // accent text colour only applies while the day is not part of a selection
      'data-[today]:font-semibold',
      'data-[today]:after:absolute data-[today]:after:bottom-1.5 data-[today]:after:size-1 data-[today]:after:rounded-full data-[today]:after:bg-current',
      '[&[data-today]:not([data-selected],[data-range-edge],[data-range-middle])]:text-accent-soft-foreground',
      'data-[range-middle]:text-accent-soft-foreground',
      'data-[selected]:bg-accent data-[selected]:font-medium data-[selected]:text-accent-foreground',
      'data-[range-edge]:bg-accent data-[range-edge]:font-medium data-[range-edge]:text-accent-foreground',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-muted data-[disabled]:line-through data-[disabled]:opacity-50 data-[disabled]:active:scale-100',
    ],
  },
});
