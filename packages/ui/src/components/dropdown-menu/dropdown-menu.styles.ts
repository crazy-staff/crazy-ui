import { tv } from '../../lib/tv';
import { popupMotion, popupSurface } from '../popover/popover.styles';

/** Shared by Dropdown Menu and Context Menu. */
export const menuStyles = tv({
  slots: {
    positioner: 'z-50 outline-none',
    popup: [
      popupSurface,
      popupMotion,
      'flex max-h-(--available-height) min-w-48 flex-col overflow-y-auto rounded-control p-1 text-sm',
    ],
    item: [
      'squircle relative flex min-h-9 w-full cursor-default select-none items-center gap-2.5 rounded-item px-2.5 py-1.5 text-start outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] ease-ui data-[highlighted]:bg-hover data-[highlighted]:text-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      '[&_svg]:size-4 [&_svg]:shrink-0 [&>svg]:text-muted',
    ],
    danger: 'text-danger data-[highlighted]:text-danger [&>svg]:text-danger',
    indicator: 'flex size-4 shrink-0 items-center justify-center text-accent-soft-foreground',
    separator: 'mx-1 my-1 h-px bg-border',
    groupLabel: 'px-2.5 pt-2 pb-1 text-xs font-medium text-muted',
    shortcut: 'ms-auto ps-4 font-mono text-[0.6875rem] tracking-wide text-muted',
    subChevron: 'ms-auto size-3.5 text-muted',
  },
});
