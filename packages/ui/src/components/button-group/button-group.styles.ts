import { tv } from '../../lib/tv';

/**
 * Joins buttons: inner corners go square, neighbouring borders overlap by one pixel.
 * Works with any Button variant; outline reads best.
 */
export const buttonGroupStyles = tv({
  base: 'inline-flex isolate [&>*:focus-visible]:z-10',
  variants: {
    orientation: {
      horizontal: [
        'flex-row',
        '[&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none',
        '[&>*:not(:first-child)]:-ms-px',
      ],
      vertical: [
        'flex-col',
        '[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none',
        '[&>*:not(:first-child)]:-mt-px',
      ],
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});
