import { tv } from '../../lib/tv';

export const spinnerStyles = tv({
  slots: {
    root: 'inline-block shrink-0 animate-spin motion-reduce:[animation-duration:2.4s]',
    track: 'stroke-current opacity-20',
    arc: 'stroke-current',
  },
  variants: {
    size: {
      sm: { root: 'size-3.5' },
      md: { root: 'size-5' },
      lg: { root: 'size-8' },
    },
    tone: {
      accent: { root: 'text-accent-soft-foreground' },
      muted: { root: 'text-muted' },
      current: { root: 'text-current' },
    },
  },
  defaultVariants: { size: 'md', tone: 'accent' },
});
