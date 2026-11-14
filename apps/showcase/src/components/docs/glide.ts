/**
 * The hover of every menu (ported from crazy-hub, which took it from Fumadocs): one neutral block
 * per column glides to the row under the mouse or the keyboard focus. The active row has its own
 * accent fill, so the block hides on it.
 */
export const GLIDE_BLOCK_CLASS =
  'squircle-motion pointer-events-none absolute top-0 left-0 z-0 rounded-item bg-hover opacity-0 transition-opacity duration-200 ease-ui motion-safe:transition-[translate,width,height,opacity]'

/**
 * Rows that already show their own fill: the block never goes there. (Not `aria-current`: the
 * router sets it on parent links too, e.g. Introduction at /docs on every docs page.)
 */
const FILLED = '[data-active=true], [aria-pressed=true], [aria-selected=true], [data-no-glide]'

/**
 * Starts the glide in `area`. The block is the area's first child with [data-glide-block], or
 * one made here. With `zoned`, only rows inside a [data-glide-zone] count.
 */
export function glide(area: HTMLElement | null, { zoned = false } = {}) {
  if (!area) return
  let block = area.firstElementChild
  if (!(block instanceof HTMLElement) || !block.hasAttribute('data-glide-block')) {
    block = document.createElement('div')
    block.setAttribute('data-glide-block', '')
    block.setAttribute('aria-hidden', 'true')
    ;(block as HTMLElement).className = GLIDE_BLOCK_CLASS
    area.prepend(block)
  }
  const el = block as HTMLElement
  if (getComputedStyle(area).position === 'static') area.style.position = 'relative'
  area.setAttribute('data-glide', '')
  let current: Element | null = null
  const show = (target: Element | null) => {
    // the active row has its own fill: treat it like empty space, so the block never starts its
    // slide from there and never paints over the accent
    const item = target && target.matches(FILLED) ? null : target
    if (item === current) return
    el.style.transitionProperty = current ? '' : 'opacity'
    current = item
    if (!item) {
      el.style.opacity = '0'
      return
    }
    const rect = item.getBoundingClientRect()
    const origin = area.getBoundingClientRect()
    el.style.translate = `${rect.left - origin.left}px ${rect.top - origin.top}px`
    el.style.width = `${rect.width}px`
    el.style.height = `${rect.height}px`
    el.style.opacity = '1'
  }
  const itemOf = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return null
    if (zoned && !target.closest('[data-glide-zone]')) return null
    const item = target.closest('a[href], button, [role=menuitem], [role=option]')
    return item && area.contains(item) && !item.closest('[data-no-glide-area]') ? item : null
  }
  const controller = new AbortController()
  const { signal } = controller
  area.addEventListener('pointerover', (e) => {
    const item = itemOf(e.target)
    if (item && e.pointerType === 'mouse') show(item)
    else if (!item) show(null)
  }, { signal })
  area.addEventListener('pointerleave', () => show(null), { signal })
  area.addEventListener('scroll', () => show(null), { signal, capture: true })
  area.addEventListener('click', () => requestAnimationFrame(() => current?.matches(FILLED) && show(null)), { signal })
  area.addEventListener('focusin', (e) => {
    if (e.target instanceof Element && e.target.matches(':focus-visible')) show(itemOf(e.target))
  }, { signal })
  area.addEventListener('focusout', () => {
    if (!area.matches(':hover')) show(null)
  }, { signal })
  return () => controller.abort()
}
