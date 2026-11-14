import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { glideBlockClass, useGlide } from '../sidebar/glide';
import { paginationStyles } from './pagination.styles';

const s = paginationStyles();

type Slot = number | 'ellipsis';

/**
 * The pages to show: first, last, the current one with `siblings` on each side, and 'ellipsis'
 * for the gaps. The number of slots stays the same on every page (so the bar never jumps):
 * `paginationRange(1, 20)` → [1, 2, 3, 4, 5, 'ellipsis', 20],
 * `paginationRange(10, 20)` → [1, 'ellipsis', 9, 10, 11, 'ellipsis', 20].
 */
export function paginationRange(page: number, total: number, siblings = 1): Slot[] {
  const slots = siblings * 2 + 5;
  if (total <= slots) return Array.from({ length: total }, (_, i) => i + 1);
  const start = Math.max(Math.min(page - siblings, total - siblings * 2 - 2), 3);
  const end = Math.min(Math.max(page + siblings, siblings * 2 + 3), total - 2);
  const out: Slot[] = [1, start > 3 ? 'ellipsis' : 2];
  for (let p = start; p <= end; p++) out.push(p);
  out.push(end < total - 2 ? 'ellipsis' : total - 1, total);
  return out;
}

/** The thumb slides with a soft spring; the numbers roll with a slightly stiffer one. */
const thumbSpring = { type: 'spring', stiffness: 520, damping: 38, mass: 0.9 } as const;
const rollSpring = { type: 'spring', stiffness: 420, damping: 34 } as const;
const instant = { duration: 0 } as const;

/** Remembers the previous value of each slot, to know which way its number rolls. */
function usePrevious<T>(value: T) {
  const ref = React.useRef(value);
  const prev = ref.current;
  React.useEffect(() => {
    ref.current = value;
  });
  return prev;
}

/**
 * The content of one slot. When its number changes it rolls like an odometer: the old number leaves
 * upwards and the new one comes from below when the window moves forward (the other way backward).
 */
function RollingSlot({ value, dir, delay, reduce }: { value: Slot; dir: number; delay: number; reduce: boolean }) {
  return (
    <span aria-hidden className={s.clip()}>
      <AnimatePresence initial={false} custom={dir}>
        <motion.span
          key={String(value)}
          custom={dir}
          className={s.number()}
          variants={{
            enter: (d: number) => ({ y: `${d * 110}%`, opacity: 0 }),
            center: { y: '0%', opacity: 1 },
            exit: (d: number) => ({ y: `${d * -110}%`, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={reduce ? instant : { ...rollSpring, delay, opacity: { duration: 0.16, delay } }}
        >
          {value === 'ellipsis' ? <Ellipsis /> : value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export interface PaginationProps extends Omit<React.ComponentPropsWithRef<'nav'>, 'onChange'> {
  /** The current page, from 1. */
  page: number;
  /** The number of pages. */
  total: number;
  onPageChange: (page: number) => void;
  /** Pages on each side of the current one. @default 1 */
  siblings?: number;
  /** Show the words "Previous" and "Next" next to the arrows (from the `sm` breakpoint). @default true */
  labels?: boolean;
  classNames?: { list?: string; page?: string; current?: string; hover?: string; ellipsis?: string; nav?: string };
}

/**
 * Moves between pages of results. The current page sits on a soft accent thumb that slides between
 * slots with a spring; when the window of pages moves, the numbers roll through their slots like an
 * odometer, in a small wave from the current page outwards. Hover is one neutral block that glides
 * between buttons (never over the current one). With reduced motion everything changes at once.
 */
export function Pagination({
  page,
  total,
  onPageChange,
  siblings = 1,
  labels = true,
  className,
  classNames,
  ...props
}: PaginationProps) {
  const reduce = useReducedMotion() ?? false;
  const go = (p: number) => onPageChange(Math.min(Math.max(p, 1), total));
  const slots = paginationRange(page, total, siblings);
  const prevSlots = usePrevious(slots);
  const pageDir = page >= usePrevious(page) ? 1 : -1;
  const active = slots.indexOf(page);
  // every slot is as wide as the widest page number, so rolling 9 → 10 never changes the bar's width
  const digits = String(total).length;
  const slotStyle = { minWidth: `max(var(--spacing-control-sm), calc(${digits}ch + 1.25rem))` };

  const areaRef = React.useRef<HTMLDivElement>(null);
  const glideRef = useGlide<HTMLDivElement>();
  const setArea = React.useCallback(
    (node: HTMLDivElement | null) => {
      areaRef.current = node;
      glideRef(node);
    },
    [glideRef],
  );

  // the thumb follows the current page's slot (measured, so it also follows wrapping and resizes)
  const [thumb, setThumb] = React.useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const measure = React.useCallback(() => {
    const area = areaRef.current;
    const el = area?.querySelector<HTMLElement>('[data-current]');
    if (!area || !el) return setThumb(null);
    const a = area.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setThumb({ x: r.left - a.left, y: r.top - a.top, width: r.width, height: r.height });
  }, []);
  React.useLayoutEffect(measure, [measure, active, total, siblings, labels]);
  React.useEffect(() => {
    const area = areaRef.current;
    if (!area || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(area);
    return () => ro.disconnect();
  }, [measure]);
  const placed = React.useRef(false);
  React.useEffect(() => {
    if (thumb) placed.current = true;
  }, [thumb]);

  const navButton = (dir: -1 | 1) => (
    <li>
      <button
        type="button"
        className={cn(s.page(), s.nav(), classNames?.page, classNames?.nav)}
        disabled={dir < 0 ? page <= 1 : page >= total}
        onClick={() => go(page + dir)}
        aria-label={dir < 0 ? 'Previous page' : 'Next page'}
      >
        {dir < 0 && <ChevronLeft aria-hidden />}
        {labels && <span className="max-sm:sr-only">{dir < 0 ? 'Previous' : 'Next'}</span>}
        {dir > 0 && <ChevronRight aria-hidden />}
      </button>
    </li>
  );

  return (
    <nav aria-label="Pagination" className={cn(s.root(), className)} {...props}>
      <div ref={setArea} className={s.area()}>
        <span data-glide-block aria-hidden className={cn(glideBlockClass, s.hover(), classNames?.hover)} />
        {thumb && (
          <motion.span
            aria-hidden
            className={cn(s.current(), classNames?.current)}
            initial={false}
            animate={thumb}
            transition={reduce || !placed.current ? instant : thumbSpring}
          >
            {/* a small squash on every page change, so the thumb answers even when the numbers move instead */}
            <motion.span
              key={page}
              className={s.thumbFill()}
              initial={reduce ? false : { scale: 0.86 }}
              animate={{ scale: 1 }}
              transition={reduce ? instant : { type: 'spring', stiffness: 600, damping: 22 }}
            />
          </motion.span>
        )}
        <ul className={cn(s.list(), classNames?.list)}>
          {navButton(-1)}
          {slots.map((p, i) => {
            const prev = prevSlots.length === slots.length ? prevSlots[i] : p;
            const dir = typeof p === 'number' && typeof prev === 'number' ? Math.sign(p - prev) || pageDir : pageDir;
            const delay = reduce ? 0 : Math.abs(i - Math.max(active, 0)) * 0.025;
            const content = <RollingSlot value={p} dir={dir} delay={delay} reduce={reduce} />;
            return p === 'ellipsis' ? (
              <li key={`slot-${i}`} aria-hidden style={slotStyle} className={cn(s.ellipsis(), classNames?.ellipsis)}>
                {content}
              </li>
            ) : (
              <li key={`slot-${i}`}>
                <button
                  type="button"
                  style={slotStyle}
                  className={cn(s.page(), classNames?.page)}
                  aria-current={p === page ? 'page' : undefined}
                  data-current={p === page ? '' : undefined}
                  data-active={p === page ? 'true' : undefined}
                  aria-label={`Page ${p}`}
                  onClick={() => go(p)}
                >
                  {content}
                </button>
              </li>
            );
          })}
          {navButton(1)}
        </ul>
      </div>
    </nav>
  );
}
