import { tv } from '../../lib/tv';

export const inputOtpStyles = tv({
  slots: {
    root: 'flex items-center gap-2 data-[disabled]:opacity-50',
    group: 'flex items-center gap-1.5',
    slot: [
      // relative + z-index: in joined slots (negative margin) the focused or filled border sits on top
      'squircle relative border border-input-border bg-input text-center font-mono font-medium text-foreground caret-accent outline-none',
      'transition-[border-color,scale] duration-[var(--cui-duration-fast)] ease-ui',
      'placeholder:text-muted/50 data-[filled]:z-[1] data-[filled]:border-border-strong focus:z-[2] focus:border-accent data-[filled]:focus:border-accent',
      'data-[invalid]:z-[1] data-[invalid]:border-danger disabled:cursor-not-allowed',
    ],
    separator: 'flex shrink-0 items-center justify-center text-muted [&_svg]:size-4',
  },
  variants: {
    size: {
      sm: { slot: 'size-control-sm rounded-control-sm text-sm' },
      md: { slot: 'size-control rounded-control text-base' },
      lg: { slot: 'size-control-lg rounded-control-lg text-lg' },
    },
  },
  defaultVariants: { size: 'md' },
});
