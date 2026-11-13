import { tv } from '../../lib/tv';

export const alertStyles = tv({
  slots: {
    root: 'squircle relative flex w-full gap-3 rounded-card border px-4 py-3.5 text-sm',
    icon: 'mt-0.5 size-4 shrink-0',
    body: 'flex min-w-0 flex-1 flex-col gap-1',
    title: 'font-medium text-foreground',
    description: 'text-muted [&_a]:underline [&_a]:underline-offset-2',
  },
  variants: {
    variant: {
      info: { root: 'border-accent-soft-foreground/25 bg-accent-soft', icon: 'text-accent-soft-foreground' },
      success: { root: 'border-success/25 bg-success/8', icon: 'text-success' },
      warning: { root: 'border-warning/30 bg-warning/8', icon: 'text-warning' },
      danger: { root: 'border-danger/30 bg-danger/8', icon: 'text-danger' },
      neutral: { root: 'border-border bg-surface', icon: 'text-muted' },
    },
  },
  defaultVariants: { variant: 'info' },
});
