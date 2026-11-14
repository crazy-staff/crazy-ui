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
    legend: 'flex flex-wrap items-center gap-x-4 gap-y-1.5',
    legendItem: 'inline-flex items-center gap-2 text-xs text-muted',
    swatch: 'size-2.5 shrink-0 rounded-[0.1875rem]',
  },
  variants: {
    legendPosition: {
      top: { legend: 'order-first' },
      bottom: { legend: 'justify-center' },
    },
  },
  defaultVariants: { legendPosition: 'top' },
});
