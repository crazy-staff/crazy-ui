import { tv } from '../../lib/tv';

export const chipStyles = tv({
  base: [
    'squircle inline-flex items-center gap-1 rounded-chip whitespace-nowrap font-medium',
    '[&_svg]:shrink-0',
  ],
  variants: {
    variant: {
      soft: 'bg-accent-soft text-accent-soft-foreground',
      solid: 'bg-accent text-accent-foreground',
      outline: 'border border-border-strong text-muted',
      neutral: 'bg-surface-2 text-muted',
    },
    size: {
      sm: 'h-5 px-1.5 text-[0.6875rem] [&_svg]:size-3',
      md: 'h-6 px-2 text-xs [&_svg]:size-3.5',
    },
  },
  defaultVariants: { variant: 'soft', size: 'md' },
});
