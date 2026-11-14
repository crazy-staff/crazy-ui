import { tv } from '../../lib/tv';

/**
 * The native resize grip is off (`resize-none`): with squircle corners the polyfill in Firefox/Safari
 * draws stray lines around it. A small grip of our own sits in the bottom-right padding instead.
 */
export const textareaStyles = tv({
  slots: {
    // a flex row: the grip follows the textarea's real right edge, even when a class narrows it
    root: 'flex w-full items-end',
    textarea: [
      'squircle block min-h-24 w-full resize-none rounded-control border border-input-border bg-input px-3.5 py-2.5',
      'text-sm text-foreground placeholder:text-muted outline-none',
      'transition-[border-color] duration-[var(--cui-duration-fast)] ease-ui',
      'focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50',
      'read-only:bg-surface-2/60',
      'aria-[invalid=true]:border-danger data-[invalid]:border-danger',
    ],
    grip: [
      'relative z-10 -ms-5 mb-1 flex size-4 shrink-0 cursor-ns-resize touch-none items-center justify-center',
      'rounded-[calc(var(--radius-chip)*0.5)] text-muted/70 outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:text-foreground',
      'focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent',
      'data-[dragging]:text-accent [&_svg]:size-2.5',
    ],
  },
  variants: {
    resize: {
      none: {},
      vertical: { textarea: 'pe-5' },
    },
  },
  defaultVariants: { resize: 'vertical' },
});
