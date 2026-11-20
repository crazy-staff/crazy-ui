import { tv } from '../../lib/tv';

/**
 * A one-of-a-few choice in a form: a segmented ToggleGroup where it fits, else (and always on a
 * phone) a full-width button showing the current choice that opens the choices in a drawer.
 */
export const choiceFieldStyles = tv({
  slots: {
    root: 'flex w-full min-w-0',
    // the toggle keeps its natural width so the field can measure whether it fits
    toggle: 'max-w-none shrink-0',
    button: 'w-full justify-start gap-3 font-normal',
    current: 'min-w-0 flex-1 truncate text-start',
    chevron: 'ms-auto text-muted',
    option: 'flex items-center gap-2',
    menu: 'min-w-(--anchor-width)',
  },
});
