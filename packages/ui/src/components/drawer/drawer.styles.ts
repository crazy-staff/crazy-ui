import { tv } from '../../lib/tv';
import { popupSurface } from '../popover/popover.styles';

/** A bottom panel you can swipe down to close (mobile-friendly sheet). */
export const drawerStyles = tv({
  slots: {
    backdrop: [
      'fixed inset-0 z-50 bg-black/30 backdrop-blur-xs',
      'opacity-[calc(1-var(--drawer-swipe-progress,0))] transition-opacity duration-[450ms] ease-ui',
      'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[swiping]:duration-0',
    ],
    viewport: 'fixed inset-0 z-50 flex items-end justify-center px-2 pb-2',
    popup: [
      popupSurface,
      'relative flex max-h-[85dvh] w-full max-w-2xl flex-col rounded-card px-6 pt-3 pb-6',
      '[transform:translateY(var(--drawer-swipe-movement-y,0px))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
      'data-[starting-style]:[transform:translateY(calc(100%+1rem))] data-[ending-style]:[transform:translateY(calc(100%+1rem))]',
      'data-[swiping]:select-none data-[swiping]:duration-0',
    ],
    handle: 'mx-auto mb-4 h-1.5 w-10 shrink-0 rounded-full bg-border-strong',
    content: 'flex min-h-0 flex-1 flex-col overflow-y-auto',
    title: 'font-heading text-lg font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)] text-foreground',
    description: 'mt-1 text-sm text-muted',
    footer: 'mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
  },
});
