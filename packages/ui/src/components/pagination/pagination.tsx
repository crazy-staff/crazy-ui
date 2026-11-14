import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '../../lib/tv';
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

/** How the numbers on the bar move: glide to the clicked slot, roll the numbers, settle. */
const GLIDE_MS = 200;
const rollDuration = (distance: number) => Math.min(240 + distance * 22, 900);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const glide = { type: 'tween', duration: GLIDE_MS / 1000, ease: [0.22, 1, 0.36, 1] } as const;

interface View {
  /** What each slot shows right now (rolls during a jump). */
  slots: Slot[];
  /** The slot under the highlight. */
  active: number;
  /** +1 when the numbers roll forward, -1 backward, 0 when still. */
  roll: number;
}

/** Plays the jump from one page to another on the slots of the bar. */
function usePaginationView(page: number, total: number, siblings: number): View {
  const reduce = useReducedMotion();
  const target = React.useMemo(() => paginationRange(page, total, siblings), [page, total, siblings]);
  const [view, setView] = React.useState<View>(() => ({ slots: target, active: target.indexOf(page), roll: 0 }));
  const viewRef = React.useRef(view);
  React.useLayoutEffect(() => {
    viewRef.current = view;
  });
  const pageRef = React.useRef(page);

  React.useEffect(() => {
    const from = pageRef.current;
    pageRef.current = page;
    const start = viewRef.current;
    const settled: View = { slots: target, active: target.indexOf(page), roll: 0 };
    const sameSlots = start.slots.length === target.length && start.slots.every((v, i) => v === target[i]);
    if (reduce || sameSlots || start.slots.length !== target.length) {
      setView(settled);
      return;
    }
    const dir = page > from ? 1 : -1;
    // 1. the highlight glides to the clicked number (or towards the gap the page hides in)
    const clicked = start.slots.indexOf(page);
    const pivot = clicked >= 0 ? clicked : dir > 0 ? start.slots.length - 2 : 1;
    setView({ ...start, active: pivot, roll: 0 });

    let frame = 0;
    const duration = rollDuration(Math.abs(page - from));
    const timer = window.setTimeout(() => {
      // 2. the numbers roll from their old values to the new ones, like a fast scroll
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - t0) / duration, 1);
        if (t >= 1) {
          // 3. the highlight settles on the new current page
          setView(settled);
          return;
        }
        const e = easeInOut(t);
        const slots = start.slots.map((old, i) => {
          const next = target[i]!;
          if (old === 'ellipsis' || next === 'ellipsis') return e < 0.5 ? old : next;
          return Math.round(old + (next - old) * e);
        });
        setView({ slots, active: pivot, roll: dir });
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, GLIDE_MS);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
    // the view is read through a ref: a jump starts from whatever the bar shows at that moment
  }, [page, target, reduce]);

  return view;
}

/** A number that slides in from the side it rolls from. */
function RollingNumber({ value, roll }: { value: number; roll: number }) {
  if (!roll) return <span className={s.number()}>{value}</span>;
  return (
    <motion.span
      key={value}
      className={s.number()}
      initial={{ x: `${roll * 45}%`, opacity: 0.2 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.08, ease: 'linear' }}
    >
      {value}
    </motion.span>
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
  classNames?: { list?: string; page?: string; current?: string; ellipsis?: string; nav?: string };
}

/**
 * Moves between pages of results. On a jump the highlight glides to the clicked number, the bar
 * rolls through the pages in between (faster the further it goes) and the highlight settles on
 * the new page. With reduced motion it changes at once.
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
  const id = React.useId();
  const go = (p: number) => onPageChange(Math.min(Math.max(p, 1), total));
  const target = paginationRange(page, total, siblings);
  const view = usePaginationView(page, total, siblings);

  const highlight = (i: number) =>
    i === view.active && (
      <motion.span layoutId={`pagination-${id}`} transition={glide} aria-hidden className={cn(s.current(), classNames?.current)} />
    );

  return (
    <nav aria-label="Pagination" className={cn(s.root(), className)} {...props}>
      <ul className={cn(s.list(), classNames?.list)}>
        <li>
          <button
            type="button"
            className={cn(s.page(), s.nav(), classNames?.page, classNames?.nav)}
            disabled={page <= 1}
            onClick={() => go(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft aria-hidden />
            {labels && <span className="max-sm:sr-only">Previous</span>}
          </button>
        </li>
        {target.map((p, i) => {
          const shown = view.slots[i] ?? p;
          // the slots keep their position while numbers roll through them
          return p === 'ellipsis' ? (
            <li
              key={`slot-${i}`}
              aria-hidden
              data-current={i === view.active ? '' : undefined}
              className={cn(s.ellipsis(), classNames?.ellipsis)}
            >
              {highlight(i)}
              <span className={s.clip()}>
                {shown === 'ellipsis' ? <Ellipsis /> : <RollingNumber value={shown} roll={view.roll} />}
              </span>
            </li>
          ) : (
            <li key={`slot-${i}`}>
              <button
                type="button"
                className={cn(s.page(), classNames?.page)}
                aria-current={p === page ? 'page' : undefined}
                data-current={i === view.active ? '' : undefined}
                aria-label={`Page ${p}`}
                onClick={() => go(p)}
              >
                {highlight(i)}
                <span aria-hidden className={s.clip()}>
                  {shown === 'ellipsis' ? <Ellipsis /> : <RollingNumber value={shown} roll={view.roll} />}
                </span>
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            className={cn(s.page(), s.nav(), classNames?.page, classNames?.nav)}
            disabled={page >= total}
            onClick={() => go(page + 1)}
            aria-label="Next page"
          >
            {labels && <span className="max-sm:sr-only">Next</span>}
            <ChevronRight aria-hidden />
          </button>
        </li>
      </ul>
    </nav>
  );
}
