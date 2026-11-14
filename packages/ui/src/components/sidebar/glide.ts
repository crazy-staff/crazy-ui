import * as React from 'react';

/**
 * The hover of a menu column (from crazy-hub, which took it from Fumadocs): one neutral block per area
 * glides to the row under the mouse or the keyboard focus. Rows that already show their own fill (the
 * active row) count as empty space, so the block never paints over the accent and never starts its
 * slide from there: leaving the active row, the block fades in at the next row instead of sliding.
 */
export const glideBlockClass = [
  'squircle pointer-events-none absolute top-0 left-0 z-0 rounded-item bg-hover opacity-0',
  'transition-opacity duration-[var(--cui-duration-normal)] ease-ui motion-safe:transition-[translate,width,height,opacity]',
].join(' ');

/** Rows with their own fill: the block never goes there. */
const FILLED = '[data-active=true], [aria-pressed=true], [aria-selected=true], [data-no-glide]';
const ROW = 'a[href], button, [role=menuitem], [role=option]';

/**
 * Starts the glide in `area`; returns a cleanup. The block is the area's child with
 * `[data-glide-block]`. Rows inside `[data-no-glide-area]` are ignored.
 */
export function glide(area: HTMLElement) {
  const block = area.querySelector<HTMLElement>(':scope > [data-glide-block]');
  if (!block) return () => {};
  let current: Element | null = null;
  const show = (target: Element | null) => {
    const item = target && target.matches(FILLED) ? null : target;
    if (item === current) return;
    // from nothing (or from the active row) the block only fades in at the row: no slide
    block.style.transitionProperty = current ? '' : 'opacity';
    current = item;
    if (!item) {
      block.style.opacity = '0';
      return;
    }
    const rect = item.getBoundingClientRect();
    const origin = area.getBoundingClientRect();
    block.style.translate = `${rect.left - origin.left}px ${rect.top - origin.top}px`;
    block.style.width = `${rect.width}px`;
    block.style.height = `${rect.height}px`;
    block.style.opacity = '1';
  };
  const rowOf = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return null;
    const item = target.closest(ROW);
    return item && area.contains(item) && !item.closest('[data-no-glide-area]') ? item : null;
  };
  const controller = new AbortController();
  const { signal } = controller;
  area.addEventListener(
    'pointerover',
    (e) => {
      const item = rowOf(e.target);
      if (item && e.pointerType === 'mouse') show(item);
      else if (!item) show(null);
    },
    { signal },
  );
  area.addEventListener('pointerleave', () => show(null), { signal });
  area.addEventListener('scroll', () => show(null), { signal, capture: true });
  area.addEventListener('click', () => requestAnimationFrame(() => current?.matches(FILLED) && show(null)), { signal });
  area.addEventListener(
    'focusin',
    (e) => {
      if (e.target instanceof Element && e.target.matches(':focus-visible')) show(rowOf(e.target));
    },
    { signal },
  );
  area.addEventListener('focusout', () => !area.matches(':hover') && show(null), { signal });
  return () => controller.abort();
}

/** A ref callback that runs `glide` on the element while it is mounted. */
export function useGlide<T extends HTMLElement>() {
  const cleanup = React.useRef<() => void>(undefined);
  return React.useCallback((node: T | null) => {
    cleanup.current?.();
    cleanup.current = node ? glide(node) : undefined;
  }, []);
}
