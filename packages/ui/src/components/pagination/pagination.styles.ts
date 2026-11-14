import { tv } from '../../lib/tv';

/**
 * The bar holds three layers: the neutral hover block (glide.ts), the accent thumb under the current
 * page, and the buttons on top. Buttons have no fill of their own, so nothing flashes on hover.
 */
export const paginationStyles = tv({
  slots: {
    root: 'flex items-center',
    area: 'relative isolate',
    list: 'relative z-10 flex flex-wrap items-center gap-1',
    page: [
      'relative inline-flex h-control-sm items-center justify-center rounded-control-sm px-2 text-sm tabular-nums outline-none select-none',
      'text-muted transition-[color,scale] duration-[var(--cui-duration-fast)] ease-ui hover:text-foreground active:scale-[var(--cui-press-scale)]',
      'focus-visible:ring-[3px] focus-visible:ring-ring',
      'data-[current]:font-medium data-[current]:text-accent-soft-foreground',
      'disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4',
    ],
    hover: 'rounded-control-sm',
    // no `squircle`: it slides by transform and resizes, which the polyfill can't follow; it takes the
    // native `corner-shape`, and a smaller plain radius where that's missing
    current: 'pointer-events-none absolute top-0 left-0 z-0',
    thumbFill: [
      'block size-full rounded-control-sm bg-accent-soft',
      'squircle-motion',
    ],
    // the numbers roll through this window; old and new number share one grid cell
    clip: 'grid overflow-hidden',
    number: 'col-start-1 row-start-1 inline-flex items-center justify-center',
    ellipsis:
      'relative inline-flex h-control-sm items-center justify-center px-2 text-sm tabular-nums text-muted select-none [&_svg]:size-4',
    nav: 'gap-1 px-2.5',
  },
});
