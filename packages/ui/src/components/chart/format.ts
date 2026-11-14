/** How numbers are written: a preset, `Intl.NumberFormat` options or your own function. */
export type ChartValueFormat =
  | 'number'
  | 'compact'
  | 'percent'
  | Intl.NumberFormatOptions
  | ((value: number) => string);

/** How x values are written: a date preset, `Intl.DateTimeFormat` options or your own function. */
export type ChartXFormat<TValue = unknown> =
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | Intl.DateTimeFormatOptions
  | ((value: TValue) => string);

const numberPresets: Record<'number' | 'compact' | 'percent', Intl.NumberFormatOptions> = {
  number: { maximumFractionDigits: 2 },
  compact: { notation: 'compact', maximumFractionDigits: 1 },
  percent: { style: 'percent', maximumFractionDigits: 1 },
};

const datePresets: Record<'day' | 'week' | 'month' | 'year', Intl.DateTimeFormatOptions> = {
  day: { day: 'numeric', month: 'short', timeZone: 'UTC' },
  week: { day: 'numeric', month: 'short', timeZone: 'UTC' },
  month: { month: 'short', timeZone: 'UTC' },
  year: { year: 'numeric', timeZone: 'UTC' },
};

/** A formatter for values; `percent` expects fractions (0.42 → 42 %), like `Intl`. */
export function makeValueFormatter(format: ChartValueFormat | undefined, locale: string): (value: number) => string {
  if (typeof format === 'function') return format;
  const options = typeof format === 'string' ? numberPresets[format] : (format ?? numberPresets.number);
  const intl = new Intl.NumberFormat(locale, options);
  return (value) => (Number.isFinite(value) ? intl.format(value) : '–');
}

function toDate(value: unknown): Date | null {
  if (value instanceof Date) return value;
  if (typeof value === 'number') return new Date(value);
  if (typeof value === 'string') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

/** A formatter for x values; without a format, values are shown as they are (dates as `day`). */
export function makeXFormatter<TValue>(format: ChartXFormat<TValue> | undefined, locale: string): (value: TValue) => string {
  if (typeof format === 'function') return format;
  const options = typeof format === 'string' ? datePresets[format] : format;
  const intl = new Intl.DateTimeFormat(locale, options ?? datePresets.day);
  return (value) => {
    if (!options && !(value instanceof Date)) return String(value);
    const date = toDate(value);
    return date ? intl.format(date) : String(value);
  };
}
