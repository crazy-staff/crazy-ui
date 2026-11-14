import { tv } from '../../lib/tv';

export const sliderStyles = tv({
  slots: {
    root: 'flex w-full flex-col gap-2 data-[disabled]:opacity-50',
    header: 'flex items-center justify-between text-sm',
    label: 'font-medium text-foreground',
    value: 'font-mono text-xs text-muted tabular-nums',
    control: 'flex h-5 w-full touch-none items-center select-none',
    track: 'relative h-1.5 w-full rounded-full bg-surface-2 border border-border',
    indicator: 'rounded-full bg-accent',
    thumb: [
      'size-4 rounded-full border-2 border-accent bg-background outline-none',
      'transition-transform duration-[var(--cui-duration-fast)] ease-ui',
      'hover:scale-110 data-[dragging]:scale-110',
      'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent',
    ],
  },
});
