import { tv } from '../../lib/tv';
import { dialogStyles } from '../dialog/dialog.styles';

/** Same panel as Dialog, narrower and without a corner close button. */
export const alertDialogStyles = tv({
  extend: dialogStyles,
  slots: {
    header: 'pe-0',
  },
  defaultVariants: { size: 'sm' },
});
