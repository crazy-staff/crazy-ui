import { tv } from '../../lib/tv';

export const skeletonStyles = tv({
  base: 'squircle block bg-surface-2 bg-no-repeat',
  variants: {
    shape: {
      line: 'h-3.5 w-full rounded-chip',
      block: 'rounded-control-sm',
      card: 'rounded-card',
      circle: 'rounded-full',
    },
  },
  defaultVariants: { shape: 'line' },
});
