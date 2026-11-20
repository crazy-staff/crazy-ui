import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { usePhone } from '../../lib/responsive';
import { cn } from '../../lib/tv';
import { Button } from '../button/button';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import { ToggleGroup } from '../toggle-group/toggle-group';
import { choiceFieldStyles } from './choice-field.styles';

const styles = choiceFieldStyles();

export interface Choice {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  /** The language of the label (e.g. a language picker's own names). */
  lang?: string;
  disabled?: boolean;
}

export interface ChoiceFieldProps {
  /** The field's name: the accessible name and the drawer's title. */
  label: string;
  choices: Choice[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /**
   * When the field becomes the button: `auto` (default) on a phone and whenever the segmented toggle
   * doesn't fit its container; `phone` only on a phone; `always` / `never`.
   */
  collapse?: 'auto' | 'phone' | 'always' | 'never';
  /** Size of the toggle and the button. On a phone the button is always `lg`. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  classNames?: { root?: string; toggle?: string; button?: string; menu?: string };
}

/** Whether `el`'s content is wider than `container`; remembers the content's width while hidden. */
function useFits(enabled: boolean) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const natural = React.useRef(0);
  const [fits, setFits] = React.useState(true);
  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const content = contentRef.current;
      if (content) natural.current = content.scrollWidth;
      const width = container.clientWidth;
      // no layout (hidden, or a test DOM): keep the toggle
      if (!width || !natural.current) return setFits(true);
      setFits(natural.current <= width);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [enabled]);
  return { containerRef, contentRef, fits };
}

/**
 * Picking one of a few options in a form (language, theme, layout).
 *   <ChoiceField label="Theme" value={theme} onValueChange={setTheme}
 *     choices={[{ value: 'light', label: 'Light', icon: <Sun /> }, …]} />
 * A segmented `ToggleGroup` where there is room; on a phone, or when the toggle would run off its
 * container, a full-width button with the current choice (icon + label + chevron) that opens the
 * choices — in a bottom drawer on a phone, a menu elsewhere (guidelines → Mobile).
 */
export function ChoiceField({
  label,
  choices,
  value: valueProp,
  defaultValue,
  onValueChange,
  collapse = 'auto',
  size = 'md',
  className,
  classNames,
}: ChoiceFieldProps) {
  const phone = usePhone();
  const [inner, setInner] = React.useState(defaultValue);
  const value = valueProp ?? inner;
  const pick = (next: string) => {
    setInner(next);
    onValueChange?.(next);
  };
  const { containerRef, contentRef, fits } = useFits(collapse === 'auto');
  const collapsed = collapse === 'always' || ((collapse === 'auto' || collapse === 'phone') && phone) || (collapse === 'auto' && !fits);

  const current = choices.find((choice) => choice.value === value);
  // one container in both forms, so the size observer keeps watching it
  return (
    <div ref={containerRef} className={cn(styles.root(), !collapsed && 'overflow-hidden', classNames?.root, className)}>
      {collapsed ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            render={
              <Button variant="outline" size={phone ? 'lg' : size} className={cn(styles.button(), classNames?.button)} aria-label={label} />
            }
          >
            {current?.icon}
            <span className={styles.current()} lang={current?.lang}>
              {current?.label}
            </span>
            <ChevronDown aria-hidden className={styles.chevron()} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content title={label} className={cn(styles.menu(), classNames?.menu)}>
            <DropdownMenu.RadioGroup value={value ?? null} onValueChange={(next) => next != null && pick(String(next))}>
              {choices.map((choice) => (
                <DropdownMenu.RadioItem key={choice.value} value={choice.value} disabled={choice.disabled} lang={choice.lang}>
                  {choice.icon}
                  {choice.label}
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <ToggleGroup
          ref={contentRef}
          aria-label={label}
          size={size}
          value={value ? [value] : []}
          onValueChange={(next) => next[0] && pick(String(next[0]))}
          className={cn(styles.toggle(), classNames?.toggle)}
          items={choices.map((choice) => ({
            value: choice.value,
            disabled: choice.disabled,
            label: (
              <span className={styles.option()} lang={choice.lang}>
                {choice.icon}
                {choice.label}
              </span>
            ),
          }))}
        />
      )}
    </div>
  );
}
