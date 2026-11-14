import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { Button } from '../button/button';
import { calendarStyles } from './calendar.styles';

const styles = calendarStyles();

/* ----------------------------------------------------------------------------------------------
 * Date helpers. Every date is a local calendar day (time is ignored), so no date library is needed.
 * -------------------------------------------------------------------------------------------- */

export interface DateRange {
  from: Date;
  to?: Date | null;
}

const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const monthStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => {
  const first = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  return new Date(first.getFullYear(), first.getMonth(), Math.min(d.getDate(), last));
};
const sameDay = (a?: Date | null, b?: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const cmp = (a: Date, b: Date) => day(a).getTime() - day(b).getTime();
const monthsBetween = (a: Date, b: Date) => (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth();
const key = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** The 6 × 7 days shown for a month, starting on `weekStartsOn`. Six rows keep the height fixed. */
function monthDays(month: Date, weekStartsOn: number) {
  const first = monthStart(month);
  const start = addDays(first, -((first.getDay() - weekStartsOn + 7) % 7));
  return Array.from({ length: 6 }, (_, w) => Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d)));
}

function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const set = React.useCallback(
    (next: T) => {
      if (!controlled) setInner(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );
  return [current, set] as const;
}

/* ---------------------------------------------------------------------------------------------- */

type Slots = keyof ReturnType<typeof calendarStyles>;

interface CalendarBaseProps {
  /** The first month shown (controlled). */
  month?: Date;
  /** The first month shown at start. Defaults to the selected date or today. */
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  /** The earliest day that can be picked. */
  min?: Date;
  /** The latest day that can be picked. */
  max?: Date;
  /** Days that can't be picked: a list, or a function that returns `true` for a disabled day. */
  disabledDates?: Date[] | ((date: Date) => boolean);
  /** Disable the whole calendar. */
  disabled?: boolean;
  /** BCP 47 locale for month and weekday names. @default 'en' */
  locale?: string;
  /** 0 = Sunday … 6 = Saturday. @default 1 */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** How many months to show side by side. @default 1 */
  numberOfMonths?: number;
  /** Show the days of the neighbouring months. @default true */
  showOutsideDays?: boolean;
  /** Move focus into the grid on mount (used by Date Picker). */
  autoFocus?: boolean;
  'aria-label'?: string;
  className?: string;
  classNames?: Partial<Record<Slots, string>>;
}

export interface CalendarSingleProps extends CalendarBaseProps {
  mode?: 'single';
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
}

export interface CalendarRangeProps extends CalendarBaseProps {
  mode: 'range';
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onValueChange?: (value: DateRange | null) => void;
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE = 28;

/**
 * A month grid for picking a day or a range of days.
 *   <Calendar value={date} onValueChange={setDate} />
 *   <Calendar mode="range" numberOfMonths={2} value={range} onValueChange={setRange} />
 * Names come from `Intl`; arrow keys, Home/End and Page Up/Down move the focus.
 */
export function Calendar(props: CalendarProps) {
  const {
    mode = 'single',
    min,
    max,
    disabledDates,
    disabled = false,
    locale = 'en',
    weekStartsOn = 1,
    numberOfMonths = 1,
    showOutsideDays = true,
    autoFocus = false,
    className,
    classNames,
  } = props;

  const [today] = React.useState(() => day(new Date()));
  const [value, setValue] = useControllable<Date | DateRange | null>(
    props.value,
    props.defaultValue ?? null,
    props.onValueChange as ((v: Date | DateRange | null) => void) | undefined,
  );
  const single = mode === 'single' ? (value as Date | null) : null;
  const range = mode === 'range' ? (value as DateRange | null) : null;
  const anchor = single ?? range?.from ?? null;

  const [month, setMonthState] = useControllable(
    props.month ? monthStart(props.month) : undefined,
    monthStart(props.defaultMonth ?? anchor ?? today),
    props.onMonthChange,
  );
  const [focused, setFocused] = React.useState<Date>(() => anchor ?? today);
  const [hovered, setHovered] = React.useState<Date | null>(null);
  const direction = React.useRef(0);
  const wantsFocus = React.useRef(autoFocus);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const months = Array.from({ length: Math.max(1, numberOfMonths) }, (_, i) => addMonths(month, i));
  const lastMonth = months[months.length - 1]!;
  const visible = (d: Date) => monthsBetween(month, d) >= 0 && monthsBetween(lastMonth, d) <= 0;

  const isDisabled = (d: Date) =>
    disabled ||
    (min !== undefined && cmp(d, min) < 0) ||
    (max !== undefined && cmp(d, max) > 0) ||
    (typeof disabledDates === 'function' ? disabledDates(d) : !!disabledDates?.some((x) => sameDay(x, d)));

  const setMonth = (next: Date) => {
    const n = monthStart(next);
    direction.current = Math.sign(monthsBetween(month, n));
    setMonthState(n);
  };

  // the day that takes Tab focus inside the grid
  const tabbable = visible(focused) ? focused : anchor && visible(anchor) ? anchor : visible(today) ? today : month;

  React.useEffect(() => {
    if (!wantsFocus.current) return;
    wantsFocus.current = false;
    rootRef.current?.querySelector<HTMLButtonElement>('button[data-day][tabindex="0"]')?.focus();
  });

  const select = (d: Date) => {
    if (isDisabled(d)) return;
    setFocused(d);
    if (!visible(d)) setMonth(cmp(d, month) < 0 ? d : addMonths(d, -(months.length - 1)));
    if (mode === 'single') {
      setValue(d);
      return;
    }
    if (!range || range.to) setValue({ from: d, to: null });
    else if (cmp(d, range.from) < 0) setValue({ from: d, to: range.from });
    else setValue({ from: range.from, to: d });
  };

  const move = (next: Date) => {
    let d = next;
    if (min && cmp(d, min) < 0) d = day(min);
    if (max && cmp(d, max) > 0) d = day(max);
    setFocused(d);
    wantsFocus.current = true;
    if (!visible(d)) setMonth(cmp(d, month) < 0 ? d : addMonths(d, -(months.length - 1)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const rtl = rootRef.current ? getComputedStyle(rootRef.current).direction === 'rtl' : false;
    const f = tabbable;
    const weekPos = (f.getDay() - weekStartsOn + 7) % 7;
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(f, rtl ? 1 : -1),
      ArrowRight: () => addDays(f, rtl ? -1 : 1),
      ArrowUp: () => addDays(f, -7),
      ArrowDown: () => addDays(f, 7),
      Home: () => addDays(f, -weekPos),
      End: () => addDays(f, 6 - weekPos),
      PageUp: () => addMonths(f, e.shiftKey ? -12 : -1),
      PageDown: () => addMonths(f, e.shiftKey ? 12 : 1),
    };
    const fn = moves[e.key];
    if (!fn) return;
    e.preventDefault();
    move(fn());
  };

  const step = (delta: number) => {
    setMonth(addMonths(month, delta));
    setFocused(addMonths(tabbable, delta));
  };

  // range shown on the grid: the picked one, or a preview while the second end is hovered
  const shown: { from: Date; to: Date } | null = (() => {
    if (!range) return null;
    const end = range.to ?? hovered;
    if (!end) return { from: range.from, to: range.from };
    return cmp(end, range.from) < 0 ? { from: end, to: range.from } : { from: range.from, to: end };
  })();

  const fmt = React.useMemo(
    () => ({
      caption: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }),
      day: new Intl.DateTimeFormat(locale, { day: 'numeric' }),
      label: new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      weekdayShort: new Intl.DateTimeFormat(locale, { weekday: 'short' }),
      weekdayLong: new Intl.DateTimeFormat(locale, { weekday: 'long' }),
    }),
    [locale],
  );
  // 2023-01-01 was a Sunday
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2023, 0, 1 + ((weekStartsOn + i) % 7)));

  const prevDisabled = disabled || (min !== undefined && monthsBetween(monthStart(min), month) <= 0);
  const nextDisabled = disabled || (max !== undefined && monthsBetween(lastMonth, monthStart(max)) <= 0);
  const offset = reduceMotion ? 0 : SLIDE;

  const inShown = (d: Date, m: Date) =>
    d.getMonth() === m.getMonth() && !!shown && cmp(d, shown.from) >= 0 && cmp(d, shown.to) <= 0;

  /** The part of the range band that falls on one week row: one rounded strip from its first to last day. */
  const renderBand = (week: Date[], m: Date) => {
    if (!shown || sameDay(shown.from, shown.to)) return null;
    const cols = week.flatMap((d, i) => (inShown(d, m) ? [i] : []));
    if (!cols.length) return null;
    const from = cols[0]!;
    const span = cols[cols.length - 1]! - from + 1;
    return (
      <div
        aria-hidden
        className={cn(styles.band(), classNames?.band)}
        style={{ '--band-from': from, '--band-span': span } as React.CSSProperties}
      />
    );
  };

  const renderDay = (d: Date, m: Date, present: boolean) => {
    const outside = d.getMonth() !== m.getMonth();
    const off = isDisabled(d);
    const inRange = inShown(d, m);
    const isStart = !!shown && sameDay(d, shown.from);
    const isEnd = !!shown && sameDay(d, shown.to);
    const edge = !outside && (isStart || isEnd);
    const band = !inRange || (isStart && isEnd) ? undefined : isStart ? 'start' : isEnd ? 'end' : 'middle';
    const selected = mode === 'single' ? sameDay(d, single) : edge && !!range;
    if (outside && !showOutsideDays) return <div key={key(d)} role="gridcell" className={cn(styles.cell(), classNames?.cell)} />;
    return (
      <div
        key={key(d)}
        role="gridcell"
        aria-selected={selected || undefined}
        data-band={band}
        className={cn(styles.cell(), classNames?.cell)}
      >
        <button
          type="button"
          data-day={key(d)}
          tabIndex={present && !outside && sameDay(d, tabbable) ? 0 : -1}
          aria-label={fmt.label.format(d)}
          aria-current={sameDay(d, today) ? 'date' : undefined}
          aria-disabled={off || undefined}
          data-today={sameDay(d, today) || undefined}
          data-outside={outside || undefined}
          data-disabled={off || undefined}
          data-selected={(mode === 'single' && selected) || undefined}
          data-range-edge={(mode === 'range' && edge) || undefined}
          data-range-middle={(band === 'middle' && !edge) || undefined}
          className={cn(styles.day(), classNames?.day)}
          onClick={() => select(d)}
          onFocus={() => !outside && setFocused(d)}
          onPointerEnter={() => mode === 'range' && !off && setHovered(d)}
          onPointerLeave={() => setHovered(null)}
        >
          {fmt.day.format(d)}
        </button>
      </div>
    );
  };

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={props['aria-label'] ?? 'Calendar'}
      data-disabled={disabled || undefined}
      className={cn(styles.root(), classNames?.root, className)}
    >
      <div className={cn(styles.nav(), classNames?.nav)}>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Previous month"
          disabled={prevDisabled}
          className={cn(styles.navButton(), classNames?.navButton)}
          onClick={() => step(-1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Next month"
          disabled={nextDisabled}
          className={cn(styles.navButton(), classNames?.navButton)}
          onClick={() => step(1)}
        >
          <ChevronRight />
        </Button>
      </div>
      <span className="sr-only" aria-live="polite">
        {months.map((m) => fmt.caption.format(m)).join(', ')}
      </span>
      <div className={cn(styles.viewport(), classNames?.viewport)}>
        <AnimatePresence initial={false} mode="popLayout" custom={direction.current}>
          <motion.div
            key={key(month)}
            custom={direction.current}
            variants={{
              enter: (dir: number) => ({ x: dir * offset, opacity: 0, filter: 'blur(3px)' }),
              center: { x: 0, opacity: 1, filter: 'blur(0px)' },
              exit: (dir: number) => ({ x: -dir * offset, opacity: 0, filter: 'blur(3px)' }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: EASE }}
            className={cn(styles.months(), classNames?.months)}
          >
            <MonthGrids>
              {(present) =>
                months.map((m) => (
                  <div key={key(m)} className={cn(styles.month(), classNames?.month)}>
                    <div aria-hidden className={cn(styles.caption(), classNames?.caption)}>
                      {/* parts keep the locale's order (e.g. year first in Japanese) */}
                      {fmt.caption.formatToParts(m).map((part, i) =>
                        part.type === 'literal' ? null : (
                          <span
                            key={i}
                            className={
                              part.type === 'year'
                                ? cn(styles.captionYear(), classNames?.captionYear)
                                : cn(styles.captionMonth(), classNames?.captionMonth)
                            }
                          >
                            {part.value}
                          </span>
                        ),
                      )}
                    </div>
                    <div
                      role="grid"
                      aria-label={fmt.caption.format(m)}
                      className={cn(styles.grid(), classNames?.grid)}
                      onKeyDown={onKeyDown}
                    >
                      <div role="row" className={cn(styles.weekdays(), classNames?.weekdays)}>
                        {weekdays.map((w) => (
                          <div
                            key={w.getDay()}
                            role="columnheader"
                            aria-label={fmt.weekdayLong.format(w)}
                            className={cn(styles.weekday(), classNames?.weekday)}
                          >
                            {fmt.weekdayShort.format(w)}
                          </div>
                        ))}
                      </div>
                      {monthDays(m, weekStartsOn).map((week) => (
                        <div key={key(week[0]!)} role="row" className={cn(styles.week(), classNames?.week)}>
                          {renderBand(week, m)}
                          {week.map((d) => renderDay(d, m, present))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              }
            </MonthGrids>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Tells the grids whether they are leaving, so a month on its way out never takes focus. */
function MonthGrids({ children }: { children: (present: boolean) => React.ReactNode }) {
  const present = useIsPresent();
  return <>{children(present)}</>;
}
