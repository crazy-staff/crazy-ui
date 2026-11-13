import { tv } from '../../lib/tv';

export const toggleGroupStyles = tv({
  slots: {
    root: 'squircle inline-flex items-center gap-0.5 rounded-control border border-border bg-surface-2/60 p-0.5 data-[orientation=vertical]:flex-col',
    item: 'rounded-[calc(var(--radius-control)-3px)] data-[pressed]:bg-background data-[pressed]:text-foreground',
  },
  variants: {
    size: {
      sm: { root: 'rounded-control-sm', item: 'rounded-[calc(var(--radius-control-sm)-3px)]' },
      md: {},
    },
  },
  defaultVariants: { size: 'md' },
});
