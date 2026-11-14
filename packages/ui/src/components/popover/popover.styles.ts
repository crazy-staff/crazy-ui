import { tv } from '../../lib/tv';

/** Surface shared by every floating panel (popover, menu, tooltip, hover card, dialog). */
export const popupSurface = 'squircle border border-border bg-popover text-foreground shadow-overlay outline-none';

/** Enter/exit like Fumadocs' popups: fade + a small scale from the trigger. */
export const popupMotion = [
  'origin-(--transform-origin) transition-[opacity,scale] duration-[var(--cui-duration-fast)] ease-ui',
  'data-[starting-style]:scale-96 data-[starting-style]:opacity-0',
  'data-[ending-style]:scale-96 data-[ending-style]:opacity-0',
].join(' ');

/** A dimmed, slightly blurred backdrop for modal overlays. */
export const backdropStyles =
  'fixed inset-0 z-50 bg-black/30 backdrop-blur-xs transition-opacity duration-[var(--cui-duration-normal)] ease-ui data-[starting-style]:opacity-0 data-[ending-style]:opacity-0';

export const popoverStyles = tv({
  slots: {
    positioner: 'z-50 outline-none',
    popup: [popupSurface, popupMotion, 'w-72 max-w-[calc(100vw-2rem)] rounded-control p-4 text-sm'],
    title: 'text-sm font-semibold text-foreground',
    description: 'mt-1 text-sm text-muted',
    close: 'absolute top-2.5 right-2.5',
  },
});
