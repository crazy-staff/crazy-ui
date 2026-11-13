import { Ellipsis, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { paginationStyles } from './pagination.styles';

const s = paginationStyles();

/**
 * The pages to show: first, last, the current one with `siblings` on each side, and
 * 'ellipsis' for the gaps. `paginationRange(5, 20)` → [1, 'ellipsis', 4, 5, 6, 'ellipsis', 20].
 */
export function paginationRange(page: number, total: number, siblings = 1): (number | 'ellipsis')[] {
  const slots = siblings * 2 + 5;
  if (total <= slots) return Array.from({ length: total }, (_, i) => i + 1);
  const start = Math.max(page - siblings, 2);
  const end = Math.min(page + siblings, total - 1);
  const out: (number | 'ellipsis')[] = [1];
  if (start > 2) out.push(start === 3 ? 2 : 'ellipsis');
  for (let p = start; p <= end; p++) out.push(p);
  if (end < total - 1) out.push(end === total - 2 ? total - 1 : 'ellipsis');
  out.push(total);
  return out;
}

export interface PaginationProps extends Omit<React.ComponentPropsWithRef<'nav'>, 'onChange'> {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  /** Pages on each side of the current one. @default 1 */
  siblings?: number;
  classNames?: { list?: string; page?: string; current?: string; ellipsis?: string };
}

/** Moves between pages of results. The current-page highlight glides between numbers. */
export function Pagination({ page, total, onPageChange, siblings = 1, className, classNames, ...props }: PaginationProps) {
  const id = React.useId();
  const go = (p: number) => onPageChange(Math.min(Math.max(p, 1), total));
  return (
    <nav aria-label="Pagination" className={cn(s.root(), className)} {...props}>
      <ul className={cn(s.list(), classNames?.list)}>
        <li>
          <button type="button" className={cn(s.page(), s.nav(), classNames?.page)} disabled={page <= 1} onClick={() => go(page - 1)} aria-label="Previous page">
            <ChevronLeft /> <span className="max-sm:sr-only">Previous</span>
          </button>
        </li>
        {paginationRange(page, total, siblings).map((p, i) =>
          p === 'ellipsis' ? (
            <li key={`e${i}`} aria-hidden className={cn(s.ellipsis(), classNames?.ellipsis)}>
              <Ellipsis />
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={cn(s.page(), classNames?.page)}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Page ${p}`}
                onClick={() => go(p)}
              >
                {p === page && (
                  <motion.span
                    layoutId={`pagination-${id}`}
                    transition={{ type: 'spring', stiffness: 520, damping: 40 }}
                    className={cn(s.current(), classNames?.current)}
                  />
                )}
                {p}
              </button>
            </li>
          ),
        )}
        <li>
          <button type="button" className={cn(s.page(), s.nav(), classNames?.page)} disabled={page >= total} onClick={() => go(page + 1)} aria-label="Next page">
            <span className="max-sm:sr-only">Next</span> <ChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
}
