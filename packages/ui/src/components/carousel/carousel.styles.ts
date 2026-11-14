import { tv } from '../../lib/tv';

/**
 * Slides are squircle cards in a clipped viewport; the controls sit in a row underneath (never over
 * the slides and never outside the frame, so nothing overflows on a phone). The current dot is one
 * accent pill that glides between dots (transform only).
 */
export const carouselStyles = tv({
  slots: {
    root: 'relative flex w-full flex-col gap-4 outline-none',
    viewport: 'overflow-hidden',
    container: 'flex touch-pan-y touch-pinch-zoom',
    item: 'min-w-0 shrink-0 grow-0 basis-full',
    card: 'squircle flex size-full flex-col overflow-hidden rounded-card border border-border bg-surface text-foreground',
    controls: 'flex items-center justify-between gap-3',
    dots: 'flex flex-wrap items-center justify-center gap-1',
    dot: [
      'relative flex size-5 items-center justify-center rounded-full outline-none',
      'before:size-1.5 before:rounded-full before:bg-border-strong before:transition-colors before:duration-[var(--cui-duration-fast)] before:content-[""]',
      'hover:before:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
    ],
    dotCurrent: 'absolute h-1.5 w-3.5 rounded-full bg-accent',
  },
  variants: {
    orientation: {
      horizontal: { container: '-ms-4', item: 'ps-4' },
      vertical: { container: '-mt-4 flex-col', item: 'pt-4' },
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});
