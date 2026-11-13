import { tv } from '../../lib/tv';

export const aspectRatioStyles = tv({
  base: 'relative w-full overflow-hidden [&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover [&>video]:absolute [&>video]:inset-0 [&>video]:size-full [&>video]:object-cover',
  variants: {
    rounded: { true: 'squircle rounded-card', false: '' },
  },
  defaultVariants: { rounded: false },
});
