import { tv } from '../../lib/tv';

export const selectStyles = tv({
  slots: {
    trigger: [
      'squircle inline-flex min-w-44 items-center justify-between gap-2',
      'border border-input-border bg-input text-foreground outline-none select-none',
      'transition-[border-color] duration-[var(--cui-duration-fast)] ease-ui',
      'focus-visible:border-accent data-[popup-open]:border-accent data-[invalid]:border-danger',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    ],
    value: 'truncate data-[placeholder]:text-muted',
    icon: 'flex text-muted [&_svg]:size-4',
    positioner: 'z-50 outline-none',
    popup: [
      'squircle min-w-[var(--anchor-width)] max-h-[var(--available-height)] overflow-y-auto',
      'rounded-control border border-border bg-popover p-1 text-sm text-foreground shadow-overlay outline-none',
      'origin-[var(--transform-origin)] transition-[transform,opacity] duration-[var(--cui-duration-fast)] ease-ui',
      'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
      'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
    ],
    item: [
      'squircle relative flex min-h-8 cursor-default items-center gap-2 rounded-item py-1.5 ps-2.5 pe-8 outline-none select-none',
      'data-[highlighted]:bg-hover data-[disabled]:opacity-50',
      'data-[selected]:font-medium data-[selected]:text-accent-soft-foreground',
    ],
    itemIndicator: 'absolute end-2.5 flex text-accent-soft-foreground [&_svg]:size-4',
    groupLabel: 'px-2.5 pt-2 pb-1 text-xs font-medium text-muted',
    separator: 'mx-1 my-1 h-px bg-border',
  },
  variants: {
    size: {
      sm: { trigger: 'h-control-sm rounded-control-sm px-2.5 text-xs' },
      md: { trigger: 'h-control rounded-control px-3.5 text-sm' },
      lg: { trigger: 'h-control-lg rounded-control-lg px-4 text-base' },
    },
  },
  defaultVariants: { size: 'md' },
});
