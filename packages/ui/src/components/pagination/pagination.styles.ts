import { tv } from '../../lib/tv';

export const paginationStyles = tv({
  slots: {
    root: 'flex items-center',
    list: 'flex flex-wrap items-center gap-1',
    page: [
      'squircle relative isolate inline-flex h-control-sm min-w-[calc(var(--cui-control-height)*0.78)] items-center justify-center rounded-control-sm px-2 text-sm tabular-nums outline-none',
      'text-muted transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:bg-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
      'aria-[current=page]:text-accent-soft-foreground aria-[current=page]:font-medium aria-[current=page]:hover:bg-transparent',
      'disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4',
    ],
    current: 'squircle absolute inset-0 -z-10 rounded-control-sm bg-accent-soft',
    ellipsis: 'inline-flex h-control-sm w-6 items-center justify-center text-muted [&_svg]:size-4',
    nav: 'gap-1 px-2.5',
  },
});
