import { CalendarDays } from 'lucide-react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { Calendar, type CalendarProps, type DateRange } from '../calendar/calendar';
import { Popover } from '../popover/popover';
import { datePickerStyles } from './date-picker.styles';

type Slots = keyof ReturnType<typeof datePickerStyles>;
type CalendarPassThrough = Pick<
  CalendarProps,
  'min' | 'max' | 'disabledDates' | 'locale' | 'weekStartsOn' | 'numberOfMonths' | 'showOutsideDays'
>;

interface DatePickerBaseProps extends CalendarPassThrough, VariantProps<typeof datePickerStyles> {
  /** Text shown while nothing is picked. */
  placeholder?: React.ReactNode;
  /** Options for `Intl.DateTimeFormat` used to show the value in the trigger. @default { dateStyle: 'medium' } */
  formatOptions?: Intl.DateTimeFormatOptions;
  /** Disable the trigger. */
  disabled?: boolean;
  /** Submit the value with a form, as `YYYY-MM-DD` (range: `name` + `[from]` / `[to]`). */
  name?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  classNames?: Partial<Record<Slots, string>>;
}

export interface DatePickerSingleProps extends DatePickerBaseProps {
  mode?: 'single';
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  mode: 'range';
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onValueChange?: (value: DateRange | null) => void;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/**
 * A field that opens a Calendar in a popover.
 *   <DatePicker value={date} onValueChange={setDate} placeholder="Pick a date" />
 *   <DatePicker mode="range" numberOfMonths={2} value={range} onValueChange={setRange} />
 */
export function DatePicker(props: DatePickerProps) {
  const {
    mode = 'single',
    placeholder = mode === 'range' ? 'Pick a range' : 'Pick a date',
    formatOptions = { dateStyle: 'medium' },
    locale = 'en',
    disabled,
    name,
    size,
    side = 'bottom',
    align = 'start',
    id,
    className,
    classNames,
    min,
    max,
    disabledDates,
    weekStartsOn,
    numberOfMonths,
    showOutsideDays,
  } = props;
  const styles = datePickerStyles({ size });

  const [inner, setInner] = React.useState<Date | DateRange | null>(props.defaultValue ?? null);
  const value = props.value !== undefined ? props.value : inner;
  const [openInner, setOpenInner] = React.useState(props.defaultOpen ?? false);
  const open = props.open ?? openInner;
  const setOpen = (next: boolean) => {
    setOpenInner(next);
    props.onOpenChange?.(next);
  };
  const popupRef = React.useRef<HTMLDivElement>(null);

  const change = (next: Date | DateRange | null) => {
    if (props.value === undefined) setInner(next);
    (props.onValueChange as ((v: Date | DateRange | null) => void) | undefined)?.(next);
    const done = mode === 'single' ? next !== null : !!(next as DateRange | null)?.to;
    if (done) setOpen(false);
  };

  const formatter = React.useMemo(() => new Intl.DateTimeFormat(locale, formatOptions), [locale, formatOptions]);
  let label: string | null = null;
  if (mode === 'single' && value) label = formatter.format(value as Date);
  if (mode === 'range' && value) {
    const r = value as DateRange;
    label = r.to ? formatter.formatRange(r.from, r.to) : `${formatter.format(r.from)} – …`;
  }

  const calendarProps = {
    min,
    max,
    disabledDates,
    locale,
    weekStartsOn,
    numberOfMonths,
    showOutsideDays,
    className: cn(styles.calendar(), classNames?.calendar),
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        id={id}
        disabled={disabled}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        className={cn(styles.trigger(), classNames?.trigger, className)}
      >
        <span className={label ? cn(styles.value(), classNames?.value) : cn(styles.placeholder(), classNames?.placeholder)}>
          {label ?? placeholder}
        </span>
        <CalendarDays aria-hidden className={cn(styles.icon(), classNames?.icon)} />
      </Popover.Trigger>
      {name && mode === 'single' && value && <input type="hidden" name={name} value={iso(value as Date)} />}
      {name && mode === 'range' && value && (
        <>
          <input type="hidden" name={`${name}[from]`} value={iso((value as DateRange).from)} />
          {(value as DateRange).to && <input type="hidden" name={`${name}[to]`} value={iso((value as DateRange).to!)} />}
        </>
      )}
      <Popover.Content
        ref={popupRef}
        side={side}
        align={align}
        sideOffset={6}
        initialFocus={() => popupRef.current?.querySelector<HTMLElement>('button[data-day][tabindex="0"]') ?? true}
        className={cn(styles.popup(), classNames?.popup)}
      >
        {mode === 'range' ? (
          <Calendar mode="range" value={value as DateRange | null} onValueChange={change} {...calendarProps} />
        ) : (
          <Calendar value={value as Date | null} onValueChange={change} {...calendarProps} />
        )}
      </Popover.Content>
    </Popover.Root>
  );
}
