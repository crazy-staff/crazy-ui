import { areaY, barY, defineChart, group, lineY, ruleY, text, type ChartGradient, type ChartPoint } from '@tanstack/charts';
import { crosshair } from '@tanstack/charts/crosshair';
import { motion } from '@tanstack/charts/motion';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import {
  Chart as TanStackChart,
  RendererChart as TanStackRendererChart,
  type ChartProps as TanStackChartProps,
} from '@tanstack/react-charts/tooltip';
import { ChartNoAxesColumn } from 'lucide-react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { Empty } from '../empty/empty';
import { Skeleton } from '../skeleton/skeleton';
import { chartStyles } from './chart.styles';
import { chartCurves, type ChartCurveName } from './curves';
import { makeValueFormatter, makeXFormatter, type ChartValueFormat, type ChartXFormat } from './format';

export { curveLinear, curveSmooth, type ChartCurveName } from './curves';
export type { ChartValueFormat, ChartXFormat } from './format';

/**
 * The series palette: the accent first, then calmer colours derived from it (hue turns in OKLCH
 * with a little less chroma, so they sit next to the accent without shouting), then the muted ink.
 * Every step reads an optional `--cui-chart-N` token first, so an app can set its own palette.
 */
export const chartPalette = [
  'var(--cui-chart-1, var(--cui-accent))',
  'var(--cui-chart-2, oklch(from var(--cui-accent) l calc(c * 0.8) calc(h - 115)))',
  'var(--cui-chart-3, oklch(from var(--cui-accent) l calc(c * 0.8) calc(h + 70)))',
  'var(--cui-chart-4, oklch(from var(--cui-accent) l calc(c * 0.8) calc(h + 150)))',
  'var(--cui-chart-5, oklch(from var(--cui-accent) l calc(c * 0.8) calc(h - 50)))',
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

export interface ChartReferenceLine {
  /** Where the line sits on the y axis. */
  value: number;
  /** Text drawn above the line, at the left. */
  label?: string;
  /** Any CSS colour. @default the muted ink */
  color?: string;
}

/** One plotted value: a data row × a visible series. */
interface ChartRow {
  kind: 'series';
  x: string;
  y: number | null;
  y1: number | null;
  y2: number | null;
  /** The value as drawn before stacking (the share with `stacked="percent"`). */
  plot: number | null;
  value: number;
  share: number;
  series: string;
  seriesIndex: number;
}

/* ---------------------------------------------------------------------------------------------- */
/* Legend                                                                                          */

export interface ChartLegendItem {
  label: string;
  color: string;
  /** Series key, passed to `onToggle`. @default label */
  key?: string;
  /** Drawn as switched off (hollow swatch, dimmed). */
  hidden?: boolean;
}

export interface ChartLegendProps extends Omit<React.ComponentPropsWithRef<'ul'>, 'onToggle'> {
  items: ChartLegendItem[];
  position?: 'top' | 'bottom';
  /** Makes each item a toggle button; called with the item's key. */
  onToggle?: (key: string) => void;
  classNames?: { item?: string; swatch?: string };
}

/** Swatches with series names, as HTML (readable, wraps on a phone). With `onToggle`, each is a toggle. */
function ChartLegend({ items, position, onToggle, className, classNames, ...props }: ChartLegendProps) {
  const s = chartStyles({ legendPosition: position });
  return (
    <ul aria-label="Legend" className={cn(s.legend(), className)} {...props}>
      {items.map((item) => {
        const swatch = (
          <span
            aria-hidden
            className={cn(s.swatch(), classNames?.swatch)}
            style={{ borderColor: item.color, background: item.hidden ? 'transparent' : item.color }}
          />
        );
        return (
          <li key={item.key ?? item.label}>
            {onToggle ? (
              <button
                type="button"
                aria-pressed={!item.hidden}
                data-hidden={item.hidden ? '' : undefined}
                className={cn(s.legendItem(), s.legendButton(), classNames?.item)}
                onClick={() => onToggle(item.key ?? item.label)}
              >
                {swatch}
                {item.label}
              </button>
            ) : (
              <span className={cn(s.legendItem(), classNames?.item)}>
                {swatch}
                {item.label}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ---------------------------------------------------------------------------------------------- */
/* Root                                                                                            */

type ChartRenderer = React.ComponentProps<typeof TanStackRendererChart>['renderer'];

export type ChartRootProps = TanStackChartProps &
  Omit<React.ComponentPropsWithRef<'div'>, keyof TanStackChartProps> & {
    /** A TanStack renderer, e.g. `motion()` from `@tanstack/charts/motion` for entrance animation. */
    renderer?: ChartRenderer;
    classNames?: { chart?: string };
  };

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
  renderTooltipBody,
  renderer,
  className,
  classNames,
  style,
  children,
  ...props
}: ChartRootProps) {
  const s = chartStyles();
  const idPrefix = React.useId().replace(/:/g, '');
  const shared = {
    definition,
    ariaLabel,
    ariaDescription,
    height: aspectRatio ? undefined : height,
    aspectRatio,
    initialWidth,
    idPrefix,
    onFocusChange,
    onSelect,
    renderTooltipBody,
    className: cn(s.chart(), classNames?.chart),
  };
  return (
    <div className={cn(s.root(), className)} style={{ ...chartVariables, ...style }} {...props}>
      {renderer ? <TanStackRendererChart {...shared} renderer={renderer} /> : <TanStackChart {...shared} />}
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------- */
/* States                                                                                          */

const LOADING_BARS = [42, 58, 50, 72, 64, 80, 70, 88, 76, 92, 84, 68];

function ChartLoading({ height, className }: { height: number; className?: string }) {
  const s = chartStyles();
  return (
    <div className={cn(s.loading(), className)} style={{ height }}>
      {LOADING_BARS.map((h, i) => (
        <Skeleton key={i} shape="block" className={s.loadingBar()} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------- */
/* Simple chart                                                                                    */

export interface ChartProps<TRow extends Record<string, unknown>>
  extends Omit<React.ComponentPropsWithRef<'div'>, 'children' | 'onSelect'>,
    VariantProps<typeof chartStyles> {
  /** `line`, `area` or `bar`. @default 'line' */
  type?: 'line' | 'area' | 'bar';
  /** One row per category (week, build…), with one field per series. */
  data: readonly TRow[];
  /** The field with the category shown on the x axis (strings, numbers or dates). */
  x: keyof TRow & string;
  /** The series to draw; each reads `row[key]`. */
  series: ChartSeries[];
  /** What the chart shows, for screen readers. */
  ariaLabel: string;
  ariaDescription?: string;
  /** Height in pixels; the width follows the container. @default 280 */
  height?: number;
  /** `smooth` draws a monotone curve (no overshoot), `linear` straight segments. @default 'smooth' */
  curve?: ChartCurveName;
  /** Stack areas or bars; `percent` stacks shares of the total (0–100 %). Bars are grouped otherwise. */
  stacked?: boolean | 'percent';
  /** Fill under lines with the series colour fading to transparent. @default true for `area` */
  gradient?: boolean;
  /** Dots on line points. */
  points?: boolean;
  /** Show the legend; its items toggle series. @default true with more than one series */
  legend?: boolean;
  /** Series keys hidden (controlled). */
  hiddenSeries?: string[];
  /** Series keys hidden at first (uncontrolled). */
  defaultHiddenSeries?: string[];
  onHiddenSeriesChange?: (hidden: string[]) => void;
  /** Horizontal grid lines. @default true */
  grid?: boolean;
  /** Crosshair and tooltip listing every series at the hovered x. @default true */
  tooltip?: boolean;
  /** Formats values on the y axis and in the tooltip. @default 'number' */
  valueFormat?: ChartValueFormat;
  /** Formats x values on the axis and in the tooltip heading (dates: `day`, `week`, `month`, `year`). */
  xFormat?: ChartXFormat<TRow[keyof TRow & string]>;
  /** Locale for number and date formatting. @default 'en-US' */
  locale?: string;
  /** Dashed horizontal lines: goals, limits, averages. */
  referenceLines?: ChartReferenceLine[];
  /** Shows a skeleton instead of the chart. */
  loading?: boolean;
  /** What the empty state says when `data` is empty. */
  empty?: { title?: React.ReactNode; description?: React.ReactNode; action?: React.ReactNode };
  /** Lines grow from the baseline and bars rise on mount; off with reduced motion. @default true */
  animate?: boolean;
  classNames?: { chart?: string; legend?: string; tooltip?: string };
}

/** The series rows under the focused x: one per series (areas and lines both report a point), in series order. */
function focusedRows(points: readonly ChartPoint[]): ChartRow[] {
  const bySeries = new Map<number, ChartRow>();
  for (const point of points) {
    const row = point.datum as ChartRow | undefined;
    if (row?.kind === 'series' && !bySeries.has(row.seriesIndex)) bySeries.set(row.seriesIndex, row);
  }
  return [...bySeries.values()].sort((a, b) => a.seriesIndex - b.seriesIndex);
}

/** Pointer-driven geometry (tooltip, crosshair) moves fast; only data shapes get the slow entrance. */
const POINTER_MOTION = { type: 'tween', duration: 140, easing: 'ease-out' } as const;

const xKey = (value: unknown) => (value instanceof Date ? value.toISOString() : String(value));
const finite = (value: number) => Number.isFinite(value);

/**
 * A line, area or bar chart (TanStack Charts) in our colours: gradient fills, smooth curves, a
 * crosshair tooltip with every series, a legend that toggles series, stacking, reference lines,
 * loading and empty states, and an entrance animation.
 *   <Chart type="area" data={weeks} x="week" series={[{ key: 'votes', label: 'Votes' }]} ariaLabel="Votes per week" />
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
  curve = 'smooth',
  stacked = false,
  gradient,
  points = false,
  legend,
  legendPosition,
  hiddenSeries,
  defaultHiddenSeries,
  onHiddenSeriesChange,
  grid = true,
  tooltip: showTooltip = true,
  valueFormat,
  xFormat,
  locale = 'en-US',
  referenceLines,
  loading = false,
  empty,
  animate = true,
  className,
  classNames,
  style,
  ...props
}: ChartProps<TRow>) {
  const s = chartStyles();
  const [hiddenState, setHiddenState] = React.useState<string[]>(defaultHiddenSeries ?? []);
  const hidden = hiddenSeries ?? hiddenState;

  const labels = series.map((item) => item.label ?? item.key);
  const colors = series.map((item, i) => item.color ?? chartColor(i));
  const seriesKey = JSON.stringify(series);
  const hiddenKey = hidden.join('\u0000');
  const refsKey = JSON.stringify(referenceLines ?? []);

  const formatValue = React.useMemo(() => makeValueFormatter(valueFormat, locale), [valueFormat, locale]);
  const formatShare = React.useMemo(() => makeValueFormatter('percent', locale), [locale]);
  const formatX = React.useMemo(() => makeXFormatter(xFormat, locale), [xFormat, locale]);

  // The x values by key, for formatting (dates become ISO keys on the scale).
  const rawX = React.useMemo(() => new Map(data.map((row) => [xKey(row[x]), row[x]])), [data, x]);
  const formatKey = React.useCallback((key: unknown) => formatX(rawX.get(String(key)) as TRow[keyof TRow & string]), [formatX, rawX]);

  const renderer = React.useMemo(
    () => (animate ? motion({ initial: 'always', transition: { type: 'tween', duration: 900, easing: 'ease-out' } }) : undefined),
    [animate],
  );

  const definition = React.useMemo(() => {
    const visible = series
      .map((item, index) => ({ ...item, index, label: labels[index]! }))
      .filter((item) => !hidden.includes(item.key));
    const keys = data.map((row) => xKey(row[x]));

    const rows: ChartRow[] = [];
    data.forEach((row, rowIndex) => {
      const values = visible.map((item) => {
        const value = row[item.key];
        return typeof value === 'number' ? value : Number.NaN;
      });
      const total = values.reduce((sum, value) => sum + (finite(value) ? value : 0), 0);
      let base = 0;
      visible.forEach((item, i) => {
        const value = values[i]!;
        const share = total ? (finite(value) ? value : 0) / total : 0;
        const plotted = stacked === 'percent' ? share : value;
        let y1: number | null = 0;
        let y2: number | null = finite(plotted) ? plotted : null;
        if (stacked) {
          y1 = base;
          y2 = base + (finite(plotted) ? plotted : 0);
          base = y2;
        }
        rows.push({ kind: 'series', x: keys[rowIndex]!, y: y2, y1, y2, plot: finite(plotted) ? plotted : null, value, share, series: item.label, seriesIndex: item.index });
      });
    });

    const color = { scale: scaleOrdinal<string, string>().domain(labels).range(colors) };
    const fillId = (row: ChartRow) => `cui-fill-${row.seriesIndex}`;
    const gradients: ChartGradient[] = colors.map((paint, i) => ({
      id: `cui-fill-${i}`,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1,
      stops:
        type === 'bar'
          ? [
              { offset: 0, color: paint, opacity: 1 },
              { offset: 1, color: paint, opacity: 0.55 },
            ]
          : [
              { offset: 0, color: paint, opacity: stacked ? 0.42 : 0.3 },
              { offset: 1, color: paint, opacity: stacked ? 0.06 : 0 },
            ],
    }));

    const axisFormat = stacked === 'percent' ? formatShare : formatValue;
    const yScale = {
      scale: scaleLinear,
      nice: true,
      ...(stacked === 'percent' ? { domain: [0, 1] as const } : {}),
      grid: grid ? { strokeOpacity: 0.12, strokeDasharray: '3 4' } : false,
      axis: { line: false, ticks: { count: 5, size: 0, padding: 10, format: axisFormat } },
    } as const;
    const xAxis = { line: { strokeOpacity: 0.18 }, ticks: { size: 0, padding: 10, format: formatKey } } as const;

    const refs = referenceLines ?? [];
    const refMarks = refs.length
      ? [
          ruleY(refs, {
            y: 'value',
            stroke: (ref: ChartReferenceLine) => ref.color ?? 'currentColor',
            strokeOpacity: 0.75,
            strokeWidth: 1.25,
            strokeDasharray: '5 4',
          }),
          text(
            refs.filter((ref) => ref.label),
            {
              x: () => keys[0]!,
              y: 'value',
              text: 'label',
              anchor: 'start',
              dy: -7,
              fontSize: 11,
              fontWeight: 500,
              fill: (ref: ChartReferenceLine) => ref.color ?? 'currentColor',
            },
          ),
        ]
      : [];

    const common = {
      color,
      gradients,
      clip: false,
      focus: 'group-x' as const,
      maxFocusDistance: Number.POSITIVE_INFINITY,
      ...(showTooltip
        ? {
            tooltip: {
              use: tooltip,
              // The tooltip follows the pointer quickly, whatever the entrance animation does.
              motion: POINTER_MOTION,
              // Plain text for the live region; the visible body is `renderTooltipBody` below.
              formatGroup: (focused: readonly ChartPoint[]) => {
                const rows = focusedRows(focused);
                if (!rows.length) return '';
                return [formatKey(rows[0]!.x), ...rows.map((row) => `${row.series}: ${formatValue(row.value)}`)].join('\n');
              },
            },
          }
        : {}),
    };

    if (type === 'bar') {
      return defineChart({
        ...common,
        // The cursor band marks the focused category; a ring on one bar would only add noise.
        focusRing: false,
        marks: [
          ...(showTooltip ? [crosshair({ x: { band: { fill: 'currentColor', fillOpacity: 0.07, radius: 6, inset: -4 } }, y: false, motion: { transition: POINTER_MOTION } })] : []),
          barY(rows, {
            x: 'x',
            // Stacked bars use the library's stack (it knows which end is the outer one to round).
            ...(stacked ? { y: 'plot' as const } : { y1: 'y1' as const, y2: 'y2' as const }),
            z: 'series',
            layout: stacked ? undefined : group({ padding: 0.14 }),
            radius: stacked ? { end: 5, stack: 'outer' } : { end: 5 },
            inset: stacked ? 0 : 1,
            maxThickness: 64,
            ...(gradient ? { fill: (row: ChartRow) => `url(#${fillId(row)})` } : {}),
          }),
          ...refMarks,
        ],
        scales: { x: { scale: () => scaleBand<string>().padding(0.3), axis: xAxis }, y: yScale },
      });
    }

    const pathCurve = chartCurves[curve];
    const filled = gradient ?? type === 'area';
    return defineChart({
      ...common,
      marks: [
        ...(showTooltip ? [crosshair({ x: { strokeOpacity: 0.35, strokeDasharray: '3 3' }, y: false, motion: { transition: POINTER_MOTION } })] : []),
        ...(filled
          ? [
              areaY(rows, {
                x: 'x',
                y1: 'y1',
                y2: 'y2',
                z: 'series',
                curve: pathCurve,
                fill: (row: ChartRow) => `url(#${fillId(row)})`,
                fillOpacity: 1,
              }),
            ]
          : []),
        lineY(rows, { x: 'x', y: 'y', z: 'series', strokeWidth: 2, curve: pathCurve, points, lineCap: 'round', lineJoin: 'round' }),
        ...refMarks,
      ],
      scales: {
        x: { scale: () => scalePoint<string>().padding(filled ? 0 : 0.04), axis: xAxis },
        y: yScale,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the keys stand for `series`, `hidden` and `referenceLines`
  }, [data, x, seriesKey, hiddenKey, refsKey, type, curve, stacked, gradient, points, grid, showTooltip, formatValue, formatShare, formatKey]);

  const renderTooltipBody = React.useCallback(
    ({ points: focused }: { points: readonly ChartPoint[] }) => {
      const rows = focusedRows(focused);
      if (!rows.length) return null;
      const total = rows.reduce((sum, row) => sum + (finite(row.value) ? row.value : 0), 0);
      return (
        <div className={cn(s.tooltip(), classNames?.tooltip)}>
          <div className={s.tooltipTitle()}>{formatKey(rows[0]!.x)}</div>
          {rows.map((row) => (
            <div key={row.seriesIndex} className={s.tooltipRow()}>
              <span aria-hidden className={s.tooltipSwatch()} style={{ background: colors[row.seriesIndex] }} />
              <span className={s.tooltipLabel()}>{row.series}</span>
              <span className={s.tooltipValue()}>
                {formatValue(row.value)}
                {stacked === 'percent' && <span className={s.tooltipShare()}>{formatShare(row.share)}</span>}
              </span>
            </div>
          ))}
          {stacked && rows.length > 1 && (
            <div className={cn(s.tooltipRow(), s.tooltipTotal())}>
              <span className={s.tooltipLabel()}>Total</span>
              <span className={s.tooltipValue()}>{formatValue(total)}</span>
            </div>
          )}
        </div>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `seriesKey` stands for the colours
    [seriesKey, stacked, formatKey, formatValue, formatShare, classNames?.tooltip],
  );

  const toggle = (key: string) => {
    const next = hidden.includes(key) ? hidden.filter((k) => k !== key) : [...hidden, key];
    if (next.length >= series.length) return; // keep at least one series on
    if (hiddenSeries === undefined) setHiddenState(next);
    onHiddenSeriesChange?.(next);
  };

  const showLegend = (legend ?? series.length > 1) && !loading && data.length > 0;
  const legendNode = showLegend ? (
    <ChartLegend
      position={legendPosition}
      className={classNames?.legend}
      onToggle={series.length > 1 ? toggle : undefined}
      items={series.map((item, i) => ({ key: item.key, label: labels[i]!, color: colors[i]!, hidden: hidden.includes(item.key) }))}
    />
  ) : null;

  if (loading || data.length === 0) {
    return (
      <div
        role="figure"
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        className={cn(s.root(), className)}
        style={{ ...chartVariables, ...style }}
        {...props}
      >
        {loading ? (
          <ChartLoading height={height} className={classNames?.chart} />
        ) : (
          <Empty
            icon={<ChartNoAxesColumn />}
            title={empty?.title ?? 'No data yet'}
            description={empty?.description}
            action={empty?.action}
            className={cn(s.empty(), classNames?.chart)}
            style={{ minHeight: height }}
          />
        )}
      </div>
    );
  }

  return (
    <ChartRoot
      definition={definition as TanStackChartProps['definition']}
      ariaLabel={ariaLabel}
      ariaDescription={ariaDescription}
      height={height}
      renderer={renderer}
      renderTooltipBody={showTooltip ? renderTooltipBody : undefined}
      className={className}
      classNames={{ chart: classNames?.chart }}
      style={style}
      {...props}
    >
      {legendNode}
    </ChartRoot>
  );
}

export const Chart = Object.assign(ChartSimple, { Root: ChartRoot, Legend: ChartLegend });
