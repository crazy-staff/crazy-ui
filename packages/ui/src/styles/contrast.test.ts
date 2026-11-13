/**
 * WCAG contrast of the theme's colour pairs, in light and dark. Every colour change must keep
 * these green (owner's rule: check contrast before changing any colour).
 */
// @vitest-environment node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const css = readFileSync(join(__dirname, 'theme.css'), 'utf8');

type RGBA = [number, number, number, number];

function block(selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`no block ${selector}`);
  const body = css.slice(start, css.indexOf('\n}', start));
  const out: Record<string, string> = {};
  for (const m of body.matchAll(/--cui-([\w-]+):\s*([^;]+);/g)) out[m[1]!] = m[2]!.trim();
  return out;
}

const light = block(':root,\n.light');
const dark = { ...light, ...block(".dark,\n[data-theme='dark']") };

function resolve(tokens: Record<string, string>, name: string): string {
  let v = tokens[name];
  if (!v) throw new Error(`missing --cui-${name}`);
  const ref = v.match(/^var\(--cui-([\w-]+)\)$/);
  if (ref) v = resolve(tokens, ref[1]!);
  return v;
}

function hsl(value: string): RGBA {
  const m = value.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%(?:\s*\/\s*([\d.]+))?\s*\)/);
  if (!m) throw new Error(`not hsl: ${value}`);
  const [h, s, l] = [Number(m[1]) / 360, Number(m[2]) / 100, Number(m[3]) / 100];
  const a = m[4] ? Number(m[4]) : 1;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const ch = (t: number) => {
    t = (t + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [ch(h + 1 / 3), ch(h), ch(h - 1 / 3), a];
}

const over = (top: RGBA, bottom: RGBA): RGBA => [
  top[0] * top[3] + bottom[0] * (1 - top[3]),
  top[1] * top[3] + bottom[1] * (1 - top[3]),
  top[2] * top[3] + bottom[2] * (1 - top[3]),
  1,
];

const lum = ([r, g, b]: RGBA) => {
  const f = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

function ratio(tokens: Record<string, string>, fg: string, bg: string, base = 'background') {
  const baseColor = hsl(resolve(tokens, base));
  const b = over(hsl(resolve(tokens, bg)), baseColor);
  const f = over(hsl(resolve(tokens, fg)), b);
  const [hi, lo] = [lum(f), lum(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

// [foreground, background, minimum ratio]
const pairs: [string, string, number][] = [
  ['foreground', 'background', 7],
  ['foreground', 'surface', 7],
  ['muted', 'background', 4.5],
  ['muted', 'surface', 4.5],
  ['muted', 'frame', 4.5],
  ['muted', 'surface-2', 4.5],
  ['accent-foreground', 'accent', 4.5],
  ['accent-soft-foreground', 'background', 4.5],
  ['accent-soft-foreground', 'accent-soft', 4.5],
  ['accent-soft-foreground', 'frame', 4.5],
  ['danger-foreground', 'danger', 4.5],
  ['danger', 'background', 3],
  ['success', 'background', 3],
  ['warning', 'background', 3],
];

describe.each([
  ['light', light],
  ['dark', dark],
])('contrast (%s)', (_mode, tokens) => {
  it.each(pairs)('%s on %s ≥ %s', (fg, bg, min) => {
    expect(ratio(tokens, fg, bg)).toBeGreaterThanOrEqual(min);
  });
});
