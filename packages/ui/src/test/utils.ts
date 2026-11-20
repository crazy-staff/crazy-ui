import axe from 'axe-core';

/**
 * Pretend the window is a phone (below `sm`) or not: stubs `matchMedia` so `usePhone()` and the
 * adaptive overlays see the given width. Call before rendering.
 */
export function setViewport(width: number) {
  window.matchMedia = ((query: string) => {
    const max = /max-width:\s*(\d+)px/.exec(query);
    const min = /min-width:\s*(\d+)px/.exec(query);
    const matches = (!max || width <= Number(max[1])) && (!min || width >= Number(min[1]));
    return {
      matches,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList;
  }) as typeof window.matchMedia;
}

/** Restore jsdom's default (no `matchMedia`: every adaptive component takes its desktop form). */
export function resetViewport() {
  // @ts-expect-error jsdom has no matchMedia by default
  delete window.matchMedia;
}

/** Run axe on the document (overlays render in portals) and fail with the rule ids it reports. */
export async function expectNoA11yViolations(root: Element = document.body) {
  const result = await axe.run(root, {
    // jsdom has no layout or colours: contrast is covered by contrast.test.ts
    rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
    // (region: a component test renders no page landmarks)
  });
  const ids = result.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
  expect(ids).toEqual([]);
}
