import { tv } from '../../lib/tv';

export const kbdStyles = tv({
  base: [
    'squircle inline-flex min-w-5 items-center justify-center gap-0.5 rounded-[calc(var(--radius-chip)*0.75)]',
    'border border-border-strong bg-surface-2 px-1.5 font-mono font-medium text-muted',
    '[&_svg]:size-3',
  ],
  variants: {
    size: {
      sm: 'h-[1.125rem] text-[0.625rem]',
      md: 'h-5 text-[0.6875rem]',
    },
  },
  defaultVariants: { size: 'md' },
});
