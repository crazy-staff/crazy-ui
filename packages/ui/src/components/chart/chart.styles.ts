import { tv } from '../../lib/tv';

/**
 * The chart frame. TanStack Charts paints axes and labels with `currentColor`, so the frame sets the
 * muted ink; series colours and the tooltip surface are CSS variables set from our tokens (see
 * `chartVariables` in chart.tsx). The tooltip gets the popover look; its corners use `corner-shape`
 * natively where supported, without the polyfill (it moves on every pointer move).
 */
export const chartStyles = tv({
  slots: {
    root: 'flex w-full min-w-0 flex-col gap-3 text-xs text-muted',
    chart: [
      'w-full min-w-0 outline-none [&_svg]:overflow-visible',
      'focus-visible:[&_svg]:rounded-control-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-control-sm',
      '[&_.ts-chart-tooltip]:[corner-shape:var(--cui-corner-shape)] [&_.ts-chart-tooltip]:tabular-nums',
    ],
    legend: 'flex flex-wrap items-center gap-x-1 gap-y-1',
    legendItem: 'inline-flex items-center gap-2 px-1.5 py-0.5 text-xs text-muted',
    legendButton: [
      'squircle rounded-chip border border-transparent outline-none',
      'transition-[color,background-color,opacity] duration-[var(--cui-duration-fast)] ease-ui',
      'hover:bg-hover hover:text-foreground focus-visible:border-ring',
      'data-[hidden]:opacity-55 data-[hidden]:line-through data-[hidden]:decoration-[1px]',
    ],
    swatch: 'size-2.5 shrink-0 rounded-[0.1875rem] border-[1.5px] border-solid',
    tooltip: [
      'flex min-w-40 flex-col gap-1 rounded-control-sm border border-border bg-popover px-3 py-2 text-xs text-foreground shadow-overlay',
      '[corner-shape:var(--cui-corner-shape)]',
    ],
    tooltipTitle: 'mb-0.5 font-medium text-foreground',
    tooltipRow: 'flex items-center gap-2',
    tooltipSwatch: 'size-2 shrink-0 rounded-[0.125rem]',
    tooltipLabel: 'flex-1 text-muted',
    tooltipValue: 'flex items-baseline gap-1.5 font-medium text-foreground tabular-nums',
    tooltipShare: 'font-normal text-muted',
    tooltipTotal: 'mt-1 border-t border-border pt-1.5',
    loading: 'flex w-full items-end gap-2 border-b border-border px-2',
    loadingBar: 'flex-1 rounded-b-none',
    empty: 'py-6',
  },
  variants: {
    legendPosition: {
      top: { legend: 'order-first' },
      bottom: { legend: 'justify-center' },
    },
  },
  defaultVariants: { legendPosition: 'top' },
});
