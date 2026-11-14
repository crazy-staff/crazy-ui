import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { textareaStyles } from './textarea.styles';

const KEY_STEP = 16;

export interface TextareaProps
  extends Omit<React.ComponentPropsWithRef<'textarea'>, 'className'>,
    VariantProps<typeof textareaStyles> {
  /** Grow (and shrink) with the content. Cap it with a `max-h-*` class; past that it scrolls. */
  autoResize?: boolean;
  /** Classes for the `<textarea>`, merged last. */
  className?: string;
  /** Classes per slot: `root` (the wrapper), `textarea`, `grip`. */
  classNames?: { root?: string; textarea?: string; grip?: string };
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as React.RefObject<T | null>).current = value;
}

/**
 * A multi-line text field. With `resize="vertical"` (default) a small grip in the bottom-right corner
 * changes the height by dragging it or with the arrow keys; `autoResize` grows it with the content.
 * No shadow and no native grip (squircle polyfill rules).
 */
export function Textarea({
  className,
  classNames,
  resize = 'vertical',
  autoResize = false,
  ref,
  onInput,
  disabled,
  value,
  ...props
}: TextareaProps) {
  const styles = textareaStyles({ resize });
  const area = React.useRef<HTMLTextAreaElement | null>(null);
  // the height the user picked with the grip; with `autoResize` it is a floor, not a fixed size
  const manual = React.useRef<number | null>(null);
  const [height, setHeight] = React.useState<number | null>(null);
  const [dragging, setDragging] = React.useState(false);

  const fit = React.useCallback(() => {
    const el = area.current;
    if (!el) return;
    if (!autoResize) {
      if (manual.current != null) el.style.height = `${manual.current}px`;
      return;
    }
    el.style.height = 'auto';
    const borders = el.offsetHeight - el.clientHeight;
    const next = Math.max(el.scrollHeight + borders, manual.current ?? 0);
    el.style.height = `${next}px`;
  }, [autoResize]);

  React.useLayoutEffect(fit, [fit, value]);
  React.useEffect(() => {
    if (area.current) setHeight(area.current.offsetHeight);
  }, []);

  const setArea = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      area.current = node;
      setRef(ref, node);
    },
    [ref],
  );

  const minHeight = () => {
    const el = area.current;
    if (!el) return 0;
    return Number.parseFloat(getComputedStyle(el).minHeight) || 0;
  };

  const resizeTo = (next: number) => {
    const el = area.current;
    if (!el) return;
    const h = Math.max(Math.round(next), minHeight());
    manual.current = h;
    el.style.height = `${h}px`;
    if (autoResize) fit();
    setHeight(el.offsetHeight);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLSpanElement>) => {
    const el = area.current;
    if (!el || disabled || event.button !== 0) return;
    event.preventDefault();
    const startY = event.clientY;
    const startHeight = el.offsetHeight;
    const grip = event.currentTarget;
    grip.setPointerCapture(event.pointerId);
    setDragging(true);
    const move = (e: PointerEvent) => resizeTo(startHeight + e.clientY - startY);
    const up = () => {
      setDragging(false);
      grip.removeEventListener('pointermove', move);
      grip.removeEventListener('pointerup', up);
      grip.removeEventListener('pointercancel', up);
    };
    grip.addEventListener('pointermove', move);
    grip.addEventListener('pointerup', up);
    grip.addEventListener('pointercancel', up);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    const el = area.current;
    if (!el || disabled) return;
    const step = event.shiftKey ? KEY_STEP * 4 : KEY_STEP;
    if (event.key === 'ArrowDown') resizeTo(el.offsetHeight + step);
    else if (event.key === 'ArrowUp') resizeTo(el.offsetHeight - step);
    else if (event.key === 'Home') resizeTo(0);
    else return;
    event.preventDefault();
  };

  return (
    <div className={cn(styles.root(), classNames?.root)} data-disabled={disabled ? '' : undefined}>
      <textarea
        ref={setArea}
        disabled={disabled}
        value={value}
        onInput={(event) => {
          onInput?.(event);
          if (autoResize) fit();
        }}
        className={cn(styles.textarea(), autoResize && 'overflow-y-auto', classNames?.textarea, className)}
        {...props}
      />
      {resize === 'vertical' && !disabled && (
        <span
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize"
          aria-valuenow={height ?? undefined}
          aria-valuemin={0}
          tabIndex={0}
          data-dragging={dragging ? '' : undefined}
          className={cn(styles.grip(), classNames?.grip)}
          onPointerDown={onPointerDown}
          onKeyDown={onKeyDown}
        >
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            <path d="M9 3 3 9M9 7 7 9" />
          </svg>
        </span>
      )}
    </div>
  );
}
