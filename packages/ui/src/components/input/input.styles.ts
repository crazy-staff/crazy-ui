import { tv } from '../../lib/tv';

export const inputStyles = tv({
  base: [
    'squircle flex w-full items-center border border-input-border bg-input',
    'text-foreground text-sm placeholder:text-muted',
    'outline-none transition-[border-color,box-shadow] duration-[var(--cui-duration-fast)] ease-ui',
    'focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[invalid]:border-danger data-[invalid]:focus-visible:ring-danger/30',
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
