import { tv } from '../../lib/tv';

export const inputStyles = tv({
  base: [
    'flex w-full items-center rounded-control border border-input-border bg-input',
    'text-foreground text-sm shadow-control placeholder:text-muted',
    'outline-none transition-[border-color,box-shadow] duration-[var(--cui-duration-fast)] ease-ui',
    'focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[invalid]:border-danger data-[invalid]:focus-visible:ring-danger/30',
  ],
  variants: {
    size: {
      sm: 'h-control-sm px-2.5',
      md: 'h-control px-3',
      lg: 'h-control-lg px-3.5 text-base',
    },
  },
  defaultVariants: { size: 'md' },
});
