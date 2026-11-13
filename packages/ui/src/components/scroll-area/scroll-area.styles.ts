import { tv } from '../../lib/tv';

export const scrollAreaStyles = tv({
  slots: {
    root: 'relative min-h-0 overflow-hidden',
    viewport: 'size-full overscroll-contain rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring',
    scrollbar: [
      'm-0.5 flex touch-none select-none rounded-full opacity-0 transition-opacity duration-[var(--cui-duration-normal)] ease-ui',
      'data-[hovering]:opacity-100 data-[scrolling]:opacity-100 data-[scrolling]:duration-0',
      'data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:flex-col',
    ],
    thumb: 'flex-1 rounded-full bg-border-strong transition-colors hover:bg-muted/60',
    corner: 'bg-transparent',
  },
  variants: {
    /** Fade the content at the top and bottom edges (like the docs sidebar). */
    fade: {
      true: { viewport: 'mask-t-from-[calc(100%-16px)] mask-b-from-[calc(100%-24px)]' },
      false: {},
    },
  },
  defaultVariants: { fade: false },
});
