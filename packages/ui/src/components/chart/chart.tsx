import { areaY, barY, defineChart, group, lineY } from '@tanstack/charts';
import { crosshair } from '@tanstack/charts/crosshair';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart as TanStackChart, type ChartProps as TanStackChartProps } from '@tanstack/react-charts';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { chartStyles } from './chart.styles';

/**
 * The series palette: the accent first, then calmer colours derived from it (hue turns with lower
 * chroma, so they sit next to the accent without shouting), then the muted ink. Every step reads an
 * optional `--cui-chart-N` token first, so an app can set its own palette.
 */
export const chartPalette = [
  'var(--cui-chart-1, var(--cui-accent))',
  'var(--cui-chart-2, oklch(from var(--cui-accent) l calc(c * 0.75) calc(h - 70)))',
  'var(--cui-chart-3, oklch(from var(--cui-accent) l calc(c * 0.7) calc(h + 80)))',
  'var(--cui-chart-4, oklch(from var(--cui-accent) l calc(c * 0.65) calc(h + 150)))',
  'var(--cui-chart-5, oklch(from var(--cui-accent) calc(l * 0.8) calc(c * 0.6) h))',
  'var(--cui-chart-6, var(--cui-muted))',
] as const;

/** The CSS variables TanStack Charts reads: palette and tooltip surface, all from our tokens. */
export const chartVariables = {
  '--ts-chart-1': chartPalette[0],
  '--ts-chart-2': chartPalette[1],
  '--ts-chart-3': chartPalette[2],
  '--ts-chart-4': chartPalette[3],
  '--ts-chart-5': chartPalette[4],
  '--ts-chart-6': chartPalette[5],
  '--ts-chart-tooltip-background': 'var(--cui-popover)',
  '--ts-chart-tooltip-color': 'var(--cui-foreground)',
  '--ts-chart-tooltip-border': 'var(--cui-border-width) solid var(--cui-border)',
  '--ts-chart-tooltip-border-radius': 'var(--cui-radius-control-sm)',
  '--ts-chart-tooltip-shadow': 'var(--cui-shadow-overlay)',
  '--ts-chart-tooltip-padding': '0.5rem 0.75rem',
  '--ts-chart-tooltip-font': '0.75rem/1.5 var(--cui-font-sans)',
} as React.CSSProperties;

/** Colour of the series at `index` (cycles through the palette). */
export const chartColor = (index: number) => `var(--ts-chart-${(index % chartPalette.length) + 1})`;

export interface ChartSeries {
  /** The field of each data row that holds this series' values. */
  key: string;
  /** Name in the legend and tooltip. @default key */
  label?: string;
  /** Any CSS colour; defaults to the palette. */
  color?: string;
}

interface ChartRow {
  x: string;
  y: number;
  series: string;
}

export interface ChartLegendProps extends React.ComponentPropsWithRef<'ul'> {
  items: { label: string; color: string }[];
  position?: 'top' | 'bottom';
  classNames?: { item?: string; swatch?: string };
}

/** Swatches with series names, as HTML (readable, wraps on a phone). */
function ChartLegend({ items, position, className, classNames, ...props }: ChartLegendProps) {
  const s = chartStyles({ legendPosition: position });
  return (
    <ul aria-label="Legend" className={cn(s.legend(), className)} {...props}>
      {items.map((item) => (
        <li key={item.label} className={cn(s.legendItem(), classNames?.item)}>
          <span aria-hidden className={cn(s.swatch(), classNames?.swatch)} style={{ background: item.color }} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export type ChartRootProps = TanStackChartProps &
  Omit<React.ComponentPropsWithRef<'div'>, keyof TanStackChartProps> & { classNames?: { chart?: string } };

/**
 * The frame for your own TanStack Charts definition: our palette, ink and tooltip surface around the
 * `Chart` of `@tanstack/react-charts`. Use `chartColor(i)` in marks for series colours.
 */
function ChartRoot({
  definition,
  ariaLabel,
  ariaDescription,
  height = 280,
  aspectRatio,
  initialWidth,
  onFocusChange,
  onSelect,
  className,
  classNames,
  style,
  children,
  ...props
}: ChartRootProps) {
  const s = chartStyles();
  const idPrefix = React.useId().replace(/:/g, '');
  return (
    <div className={cn(s.root(), className)} style={{ ...chartVariables, ...style }} {...props}>
      <TanStackChart
        definition={definition}
        ariaLabel={ariaLabel}
        ariaDescription={ariaDescription}
        height={aspectRatio ? undefined : height}
        aspectRatio={aspectRatio}
        initialWidth={initialWidth}
        idPrefix={idPrefix}
        onFocusChange={onFocusChange}
        onSelect={onSelect}
        className={cn(s.chart(), classNames?.chart)}
      />
      {children}
    </div>
  );
}

export interface ChartProps<TRow extends Record<string, unknown>> extends Omit<React.ComponentPropsWithRef<'div'>, 'children' | 'onSelect'>, VariantProps<typeof chartStyles> {
  /** `line`, `area` or `bar`. @default 'line' */
  type?: 'line' | 'area' | 'bar';
  /** One row per category (month, build…), with one field per series. */
  data: readonly TRow[];
  /** The field with the category shown on the x axis. */
  x: keyof TRow & string;
  /** The series to draw; each reads `row[key]`. */
  series: ChartSeries[];
  /** What the chart shows, for screen readers. */
  ariaLabel: string;
  ariaDescription?: string;
  /** Height in pixels; the width follows the container. @default 280 */
  height?: number;
  /** Stack areas or bars instead of overlapping / grouping them. */
  stacked?: boolean;
  /** Dots on line points. */
  points?: boolean;
  /** Show the legend. @default true with more than one series */
  legend?: boolean;
  /** Horizontal grid lines. @default true */
  grid?: boolean;
  /** Formats values on the y axis and in the tooltip. */
  valueFormat?: (value: number) => string;
  classNames?: { chart?: string; legend?: string };
}

/**
 * A line, area or bar chart (TanStack Charts) in our colours, with a popover-style tooltip.
 *   <Chart type="area" data={months} x="month" series={[{ key: 'votes', label: 'Votes' }]} ariaLabel="Votes per month" />
 * For anything else, build a TanStack definition and render it in `Chart.Root`.
 */
function ChartSimple<TRow extends Record<string, unknown>>({
  type = 'line',
  data,
  x,
  series,
  ariaLabel,
  ariaDescription,
  height = 280,
  stacked = false,
  points = false,
  legend,
  legendPosition,
  grid = true,
  valueFormat,
  className,
  classNames,
  ...props
}: ChartProps<TRow>) {
  const labels = series.map((item) => item.label ?? item.key);
  const colors = series.map((item, i) => item.color ?? chartColor(i));
  const seriesKey = JSON.stringify(series);

  const definition = React.useMemo(() => {
    const rows: ChartRow[] = [];
    for (const row of data) {
      series.forEach((item, i) => {
        const value = row[item.key];
        rows.push({ x: String(row[x]), y: typeof value === 'number' ? value : Number.NaN, series: labels[i]! });
      });
    }
    const color = { scale: scaleOrdinal<string, string>().domain(labels).range(colors) };
    const format = valueFormat ?? ((value: number) => value.toLocaleString());
    const yScale = {
      scale: scaleLinear,
      nice: true,
      grid: grid ? { strokeOpacity: 0.14 } : false,
      axis: { line: false, ticks: { count: 5, size: 0, padding: 8, format } },
    } as const;
    const xAxis = { line: { strokeOpacity: 0.2 }, ticks: { size: 0, padding: 10 } } as const;
    const tip = {
      use: tooltip,
      items: [{ channel: 'y' as const, text: (point: { yValue: number }) => format(point.yValue) }],
    };
    const common = { color, tooltip: tip, focus: 'group-x' as const, svgAnimation: true, clip: false };

    if (type === 'bar') {
      return defineChart({
        ...common,
        marks: [
          barY(rows, {
            x: 'x',
            y: 'y',
            z: 'series',
            layout: stacked ? undefined : group({ padding: 0.12 }),
            radius: stacked ? { end: 5 } : { end: 5 },
            inset: stacked ? 0 : 1,
          }),
        ],
        scales: { x: { scale: () => scaleBand<string>().padding(0.28), axis: xAxis }, y: yScale },
      });
    }
    const line = lineY(rows, { x: 'x', y: 'y', z: 'series', strokeWidth: 2, points });
    const marks =
      type === 'area'
        ? stacked
          ? [areaY(rows, { x: 'x', y: 'y', z: 'series', fillOpacity: 0.35 })]
          : [areaY(rows, { x: 'x', y1: 0, y2: 'y', z: 'series', fillOpacity: 0.14 }), line]
        : [line];
    return defineChart({
      ...common,
      maxFocusDistance: Number.POSITIVE_INFINITY,
      marks: [crosshair({ x: { strokeOpacity: 0.3 }, y: false }), ...marks],
      scales: { x: { scale: () => scalePoint<string>().padding(type === 'area' ? 0 : 0.04), axis: xAxis }, y: yScale },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `seriesKey` stands for `series`
  }, [data, x, seriesKey, type, stacked, points, grid, valueFormat]);

  const showLegend = legend ?? series.length > 1;
  return (
    <ChartRoot
      definition={definition as TanStackChartProps['definition']}
      ariaLabel={ariaLabel}
      ariaDescription={ariaDescription}
      height={height}
      className={className}
      classNames={{ chart: classNames?.chart }}
      {...props}
    >
      {showLegend && (
        <ChartLegend
          position={legendPosition}
          className={classNames?.legend}
          items={labels.map((label, i) => ({ label, color: colors[i]! }))}
        />
      )}
    </ChartRoot>
  );
}

export const Chart = Object.assign(ChartSimple, { Root: ChartRoot, Legend: ChartLegend });
