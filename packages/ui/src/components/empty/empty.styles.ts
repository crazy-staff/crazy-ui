import { tv } from '../../lib/tv';

export const emptyStyles = tv({
  slots: {
    root: 'squircle flex w-full flex-col items-center justify-center gap-1 rounded-card border border-dashed border-border-strong px-6 py-10 text-center',
    icon: 'squircle mb-3 flex size-11 items-center justify-center rounded-control-sm bg-accent-soft text-accent-soft-foreground [&_svg]:size-5',
    title: 'font-heading text-base font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)] text-foreground',
    description: 'max-w-sm text-sm text-muted',
    actions: 'mt-4 flex flex-wrap items-center justify-center gap-2',
  },
});
