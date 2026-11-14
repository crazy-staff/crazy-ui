import { tv } from '../../lib/tv';

export const inputStyles = tv({
  base: [
    'squircle flex w-full items-center border border-input-border bg-input',
    'text-foreground text-sm placeholder:text-muted',
    // focus and invalid show on the border only: no ring or shadow on a squircle <input>
    'outline-none transition-[border-color] duration-[var(--cui-duration-fast)] ease-ui',
    'focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50',
    'read-only:bg-surface-2/60',
    'aria-[invalid=true]:border-danger data-[invalid]:border-danger',
  ],
  variants: {
    size: {
      sm: 'h-control-sm rounded-control-sm px-2.5',
      md: 'h-control rounded-control px-3.5',
      lg: 'h-control-lg rounded-control-lg px-4 text-base',
    },
  },
  defaultVariants: { size: 'md' },
});
