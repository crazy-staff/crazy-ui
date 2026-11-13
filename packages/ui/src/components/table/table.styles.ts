import { tv } from '../../lib/tv';

export const tableStyles = tv({
  slots: {
    wrapper: 'squircle w-full overflow-x-auto rounded-card border border-border bg-surface',
    table: 'w-full border-collapse text-sm',
    caption: 'caption-bottom px-4 py-3 text-start text-xs text-muted',
    header: 'bg-surface-2/70',
    body: '',
    footer: 'border-t border-border bg-surface-2/40 font-medium',
    row: 'border-b border-border last:border-b-0 transition-colors duration-[var(--cui-duration-fast)] ease-ui',
    head: 'h-10 px-4 text-start align-middle text-xs font-medium whitespace-nowrap text-muted [&+&]:border-s [&+&]:border-border',
    cell: 'px-4 py-3 align-middle text-foreground [&+&]:border-s [&+&]:border-border',
  },
  variants: {
    /** Highlight rows on hover (lists you can click into). */
    hover: { true: { row: 'hover:bg-hover/50' }, false: {} },
    /** Tighter rows. */
    dense: { true: { head: 'h-8 px-3', cell: 'px-3 py-2' }, false: {} },
  },
  defaultVariants: { hover: false, dense: false },
});
