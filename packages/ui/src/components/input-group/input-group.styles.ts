import { tv } from '../../lib/tv';

export const inputGroupStyles = tv({
  slots: {
    root: [
      'squircle flex w-full items-center border border-input-border bg-input text-sm text-foreground',
      'transition-[border-color] duration-[var(--cui-duration-fast)] ease-ui',
      'focus-within:border-accent has-[input:disabled]:opacity-50',
      'has-[[aria-invalid=true]]:border-danger has-[[data-invalid]]:border-danger',
    ],
    input: 'h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted disabled:cursor-not-allowed',
    addon: 'flex shrink-0 items-center gap-1.5 text-muted [&_svg]:size-4 [&_svg]:shrink-0',
  },
  variants: {
    size: {
      sm: { root: 'h-control-sm rounded-control-sm gap-2 px-2.5' },
      md: { root: 'h-control rounded-control gap-2.5 px-3.5' },
      lg: { root: 'h-control-lg rounded-control-lg gap-3 px-4 text-base' },
    },
  },
  defaultVariants: { size: 'md' },
});
