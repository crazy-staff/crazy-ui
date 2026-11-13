import { tv } from '../../lib/tv';

export const checkboxStyles = tv({
  slots: {
    root: [
      'squircle peer inline-flex size-[1.125rem] shrink-0 items-center justify-center',
      'rounded-[calc(var(--radius-chip)*0.75)] border border-muted/70 bg-input text-accent-foreground',
      'outline-none transition-[background-color,border-color] duration-[var(--cui-duration-fast)] ease-ui',
      'focus-visible:border-accent data-[checked]:border-accent data-[checked]:bg-accent',
      'data-[indeterminate]:border-accent data-[indeterminate]:bg-accent',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    ],
    indicator: 'flex [&_svg]:size-3.5 [&_svg]:stroke-[3]',
    label: 'inline-flex cursor-pointer items-center gap-2.5 text-sm text-foreground has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50',
    group: 'flex flex-col gap-2.5',
  },
});
