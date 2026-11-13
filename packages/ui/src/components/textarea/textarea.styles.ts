import { tv } from '../../lib/tv';

export const textareaStyles = tv({
  base: [
    'squircle flex min-h-24 w-full rounded-control border border-input-border bg-input px-3.5 py-2.5',
    'text-sm text-foreground placeholder:text-muted outline-none field-sizing-content',
    'transition-[border-color] duration-[var(--cui-duration-fast)] ease-ui',
    'focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50',
    'aria-[invalid=true]:border-danger data-[invalid]:border-danger',
  ],
  variants: {
    resize: {
      none: 'resize-none',
      vertical: 'resize-y',
    },
  },
  defaultVariants: { resize: 'vertical' },
});
