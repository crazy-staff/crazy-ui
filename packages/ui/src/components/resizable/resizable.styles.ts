import { tv } from '../../lib/tv';

/**
 * Panels split by a hairline. The hairline turns accent while hovered or dragged; the optional grip is a
 * small rounded tile on the line. The hit area is wider than the line (a transparent pseudo-element).
 */
export const resizableStyles = tv({
  slots: {
    group: 'flex size-full',
    panel: 'min-h-0 min-w-0',
    handle: [
      'group/handle relative flex shrink-0 items-center justify-center bg-border outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] ease-ui',
      'data-[separator=hover]:bg-accent data-[separator=active]:bg-accent focus-visible:bg-accent',
      'data-[separator=disabled]:pointer-events-none',
      'after:absolute after:content-[""]',
    ],
    grip: [
      'squircle relative z-10 flex items-center justify-center rounded-chip border border-border-strong bg-surface text-muted',
      'transition-[color,transform] duration-[var(--cui-duration-fast)] ease-ui',
      'group-data-[separator=hover]/handle:text-foreground group-data-[separator=active]/handle:text-foreground',
      'group-data-[separator=active]/handle:scale-110 [&_svg]:size-3',
    ],
  },
  variants: {
    orientation: {
      horizontal: {
        group: 'flex-row',
        handle: 'w-px cursor-col-resize after:inset-y-0 after:-inset-x-1.5',
        grip: 'h-6 w-3.5',
      },
      vertical: {
        group: 'flex-col',
        handle: 'h-px cursor-row-resize after:inset-x-0 after:-inset-y-1.5',
        grip: 'h-3.5 w-6',
      },
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});
