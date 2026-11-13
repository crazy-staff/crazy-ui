import { tv } from '../../lib/tv';
import { menuStyles } from '../dropdown-menu/dropdown-menu.styles';

/** Context Menu reuses the menu look; only the trigger area is its own. */
export const contextMenuStyles = tv({
  extend: menuStyles,
  slots: {
    area: 'select-none',
  },
});
