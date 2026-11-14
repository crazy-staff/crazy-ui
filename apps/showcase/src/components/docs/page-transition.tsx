/**
 * Page transitions (ported from crazy-hub). A page comes in from the direction of its link in the
 * sidebar: further down the menu rises from below, higher up drops in from above. Inside, the
 * blocks of the page (title, description, sections) rise one after another, top to bottom.
 */
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, type ReactNode } from 'react';

export const EASE = [0.22, 1, 0.36, 1] as const;

/** The first page of a visit is server-rendered: shown as it is, not animated in. */
let booted = false;
let last: { id: string; position: number } | null = null;
const dirs = new Map<string, number>();

export function PageTransition({ id, position, children }: { id: string; position: number; children: ReactNode }) {
  const reduce = useReducedMotion();
  if (last?.id !== id) {
    dirs.set(id, !last || last.position === position ? 0 : position > last.position ? 1 : -1);
    last = { id, position };
  }
  const dir = dirs.get(id) ?? 0;
  useEffect(() => {
    booted = true;
  }, []);
  const animate = booted && !reduce;
  return (
    <motion.div
      key={id}
      data-page-enter={animate ? '' : undefined}
      className="flex flex-col gap-4"
      initial={animate ? { opacity: 0, y: dir === 0 ? 12 : dir * 40, filter: 'blur(6px)' } : false}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
