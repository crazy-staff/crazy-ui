import { tv } from '../../lib/tv';
import { popupMotion, popupSurface } from '../popover/popover.styles';

export const tooltipStyles = tv({
  slots: {
    positioner: 'z-50',
    popup: [popupSurface, popupMotion, 'max-w-64 rounded-chip px-2.5 py-1.5 text-xs leading-snug'],
  },
});
