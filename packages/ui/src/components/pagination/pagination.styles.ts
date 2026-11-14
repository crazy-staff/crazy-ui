import { tv } from '../../lib/tv';

export const paginationStyles = tv({
  slots: {
    root: 'flex items-center',
    list: 'flex flex-wrap items-center gap-1',
    page: [
      'squircle relative isolate inline-flex h-control-sm min-w-control-sm items-center justify-center rounded-control-sm px-2 text-sm tabular-nums outline-none',
      'text-muted transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:bg-hover hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring',
      'data-[current]:font-medium data-[current]:text-accent-soft-foreground data-[current]:hover:bg-transparent',
      'disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4',
    ],
    // no `squircle`: it moves between slots by layout animation, which the polyfill can't follow
    current: 'absolute inset-0 -z-10 rounded-control-sm bg-accent-soft [corner-shape:var(--cui-corner-shape)]',
    // clips the numbers while they roll through the slot
    clip: 'inline-flex justify-center overflow-hidden',
    number: 'inline-block',
    ellipsis:
      'squircle relative isolate inline-flex h-control-sm min-w-control-sm items-center justify-center rounded-control-sm px-2 text-sm tabular-nums text-muted data-[current]:font-medium data-[current]:text-accent-soft-foreground [&_svg]:size-4',
    nav: 'gap-1 px-2.5',
  },
});
