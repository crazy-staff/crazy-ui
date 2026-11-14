import { tv } from '../../lib/tv';
import { backdropStyles, popupSurface } from '../popover/popover.styles';

/** A floating side panel, inset from the window edge like the docs page panel. */
export const sheetStyles = tv({
  slots: {
    backdrop: backdropStyles,
    popup: [
      popupSurface,
      'fixed z-50 flex flex-col overflow-y-auto rounded-card p-6',
      'transition-[translate,opacity] duration-[var(--cui-duration-normal)] ease-ui data-[ending-style]:opacity-0',
    ],
    header: 'flex flex-col gap-1.5 pe-8',
    title: 'font-heading text-lg font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)] text-foreground',
    description: 'text-sm text-muted',
    body: 'mt-5 flex-1 text-sm',
    footer: 'mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
    close: 'absolute top-4 right-4',
  },
  variants: {
    side: {
      right: { popup: 'inset-y-2 right-2 w-[min(26rem,calc(100vw-1rem))] data-[starting-style]:translate-x-[calc(100%+1rem)] data-[ending-style]:translate-x-[calc(100%+1rem)]' },
      left: { popup: 'inset-y-2 left-2 w-[min(26rem,calc(100vw-1rem))] data-[starting-style]:-translate-x-[calc(100%+1rem)] data-[ending-style]:-translate-x-[calc(100%+1rem)]' },
      top: { popup: 'inset-x-2 top-2 max-h-[80dvh] data-[starting-style]:-translate-y-[calc(100%+1rem)] data-[ending-style]:-translate-y-[calc(100%+1rem)]' },
      bottom: { popup: 'inset-x-2 bottom-2 max-h-[80dvh] data-[starting-style]:translate-y-[calc(100%+1rem)] data-[ending-style]:translate-y-[calc(100%+1rem)]' },
    },
  },
  defaultVariants: { side: 'right' },
});
