import { tv } from '../../lib/tv';
import { popupMotion, popupSurface } from '../popover/popover.styles';

/**
 * Same surface as popovers and menus, just smaller: a small-control radius (never the chip one, which
 * read as a sharp box), roomy padding and regular-weight text. No arrow: a pointed tip breaks the
 * squircle outline, and the side offset already makes the anchor obvious.
 */
export const tooltipStyles = tv({
  slots: {
    positioner: 'z-50',
    popup: [
      popupSurface,
      popupMotion,
      'max-w-72 rounded-control-sm px-3 py-2 text-xs leading-relaxed text-balance',
    ],
  },
});
