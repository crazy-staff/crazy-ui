import { tv } from '../../lib/tv';
import { popupMotion, popupSurface } from '../popover/popover.styles';

export const hoverCardStyles = tv({
  slots: {
    positioner: 'z-50 outline-none',
    popup: [popupSurface, popupMotion, 'w-80 max-w-[calc(100vw-2rem)] rounded-card p-4 text-sm'],
  },
});
