import { registerHyperellipse } from 'hyperellipse';

type Options = Parameters<typeof registerHyperellipse>[0];
let fallback: boolean | undefined;

/**
 * Turns on squircle corners everywhere the `squircle` class is used. Chromium renders the CSS
 * `corner-shape` property natively; Firefox (Zen) and Safari get the `hyperellipse` fallback.
 * Call once on the client; calling again returns the same controller. No-op during SSR.
 *
 * When the fallback runs, `<html data-squircle-fallback>` is set. The theme then stops
 * transitioning background, border and shadow on squircle elements: the fallback paints them
 * into an SVG layer from the computed style and would capture a half-way (transparent) colour.
 */
export function registerSquircles(options?: Options) {
  const controller = registerHyperellipse(options);
  if (typeof document !== 'undefined') {
    fallback ??= Boolean(options?.force) || !controller.supported;
    document.documentElement.toggleAttribute('data-squircle-fallback', fallback);
  }
  return controller;
}
