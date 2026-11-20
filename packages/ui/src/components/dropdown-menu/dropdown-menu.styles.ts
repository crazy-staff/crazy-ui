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
    /**
     * A picked option (radio, checkbox, `checked` item): tinted with the soft accent, a small check at
     * the end, no leading indicator column (guidelines → Mobile).
     */
    picked: [
      'data-[checked]:bg-accent-soft/60 data-[checked]:text-accent-soft-foreground',
      'data-[checked]:data-[highlighted]:bg-accent-soft data-[checked]:data-[highlighted]:text-accent-soft-foreground',
      'data-[checked]:[&>svg]:text-accent-soft-foreground',
    ],
    indicator: 'ms-auto flex shrink-0 items-center ps-3 text-accent-soft-foreground [&_svg]:size-3.5! [&_svg]:stroke-[2.5]',
    /** The menu's title at the top of the popup (`showTitle`), with room under it. */
    title: 'px-2.5 pt-1.5 pb-2 text-xs font-medium text-muted',
    separator: 'mx-1 my-1 h-px bg-border',
    groupLabel: 'px-2.5 pt-2 pb-1 text-xs font-medium text-muted',
    shortcut: 'ms-auto ps-4 font-mono text-[0.6875rem] tracking-wide text-muted',
    subChevron: 'ms-auto size-3.5 text-muted',
  },
});

/**
 * A menu shown as a bottom drawer on a phone: rows made for a finger (at least 48px, `text-base`,
 * 20px icons, 4px apart), the picked option tinted with a small check at the end.
 */
export const menuDrawerStyles = tv({
  slots: {
    list: 'flex flex-col gap-1 pt-3 pb-2',
    row: [
      'squircle flex min-h-12 w-full cursor-pointer select-none items-center gap-3 rounded-control px-3.5 text-start text-base text-foreground outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:bg-hover active:bg-hover focus-visible:ring-2 focus-visible:ring-ring',
      'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
      '[&_svg]:size-5 [&_svg]:shrink-0 [&>svg]:text-muted',
    ],
    danger: 'text-danger [&>svg]:text-danger',
    picked: 'bg-accent-soft text-accent-soft-foreground hover:bg-accent-soft [&>svg]:text-accent-soft-foreground',
    check: 'ms-auto size-4! shrink-0 stroke-[2.5] text-accent-soft-foreground',
    separator: 'my-1 h-px shrink-0 bg-border',
    group: 'flex flex-col gap-1',
    groupLabel: 'px-3.5 pt-3 pb-1 text-sm font-medium text-muted',
    sub: 'flex flex-col gap-1 ps-4',
  },
});
