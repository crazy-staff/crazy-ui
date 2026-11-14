import { tv } from '../../lib/tv';

/**
 * An overlay pinned to one edge of its positioned parent. The layers are stacked `backdrop-filter`
 * blurs, each masked to a band, so the blur grows towards the edge instead of starting at a hard line.
 */
export const progressiveBlurStyles = tv({
  slots: {
    root: 'pointer-events-none absolute z-10 overflow-hidden',
    layer: 'absolute inset-0',
    tint: 'absolute inset-0',
  },
  variants: {
    side: {
      top: { root: 'inset-x-0 top-0' },
      bottom: { root: 'inset-x-0 bottom-0' },
      left: { root: 'inset-y-0 left-0' },
      right: { root: 'inset-y-0 right-0' },
    },
  },
  defaultVariants: { side: 'bottom' },
});
