import { tv } from '../../lib/tv';

export const progressStyles = tv({
  slots: {
    root: 'flex w-full flex-col gap-2',
    header: 'flex items-center justify-between gap-3 text-sm',
    label: 'font-medium text-foreground',
    value: 'tabular-nums text-muted',
    track: 'relative h-2 w-full overflow-hidden rounded-full bg-surface-2',
    indicator: [
      'block h-full rounded-full bg-accent',
      'transition-[width] duration-[var(--cui-duration-normal)] ease-ui motion-reduce:transition-none',
      'data-[indeterminate]:w-1/3 data-[indeterminate]:animate-pulse',
    ],
  },
  variants: {
    size: {
      sm: { track: 'h-1' },
      md: { track: 'h-2' },
      lg: { track: 'h-3' },
    },
  },
  defaultVariants: { size: 'md' },
});
