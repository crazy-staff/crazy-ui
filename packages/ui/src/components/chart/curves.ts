import type { ChartCurve } from '@tanstack/charts';

type Point = readonly [number, number];

const n = (value: number) => Math.round(value * 100) / 100;

/** Straight segments through every point. */
function linearSegments(points: readonly Point[], start: 'M' | 'L'): string {
  return points.map(([x, y], i) => `${i === 0 ? start : 'L'}${n(x)},${n(y)}`).join('');
}

/**
 * Monotone cubic interpolation (Fritsch–Carlson, the same idea as d3's `curveMonotoneX`): a smooth
 * curve that passes through every point and never overshoots, so a peak in the data stays the peak
 * of the curve and a flat run stays flat. Each segment is a cubic Bézier whose control points sit a
 * third of the way along x, on the tangent at each end.
 */
function monotoneSegments(points: readonly Point[], start: 'M' | 'L'): string {
  const count = points.length;
  if (count < 3) return linearSegments(points, start);

  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < count - 1; i++) {
    const h = points[i + 1]![0] - points[i]![0];
    dx.push(h);
    slope.push(h === 0 ? 0 : (points[i + 1]![1] - points[i]![1]) / h);
  }

  // Tangent at each point: zero at a local extreme, otherwise the weighted harmonic mean of the
  // neighbouring slopes (keeps the curve monotone between points). The ends use one-sided slopes.
  const tangent: number[] = new Array(count);
  tangent[0] = slope[0]!;
  tangent[count - 1] = slope[count - 2]!;
  for (let i = 1; i < count - 1; i++) {
    const s0 = slope[i - 1]!;
    const s1 = slope[i]!;
    if (s0 * s1 <= 0) {
      tangent[i] = 0;
    } else {
      const h0 = dx[i - 1]!;
      const h1 = dx[i]!;
      tangent[i] = (3 * (h0 + h1)) / ((2 * h1 + h0) / s0 + (h1 + 2 * h0) / s1);
    }
  }

  let path = `${start}${n(points[0]![0])},${n(points[0]![1])}`;
  for (let i = 0; i < count - 1; i++) {
    const [x0, y0] = points[i]!;
    const [x1, y1] = points[i + 1]!;
    const third = dx[i]! / 3;
    path += `C${n(x0 + third)},${n(y0 + tangent[i]! * third)},${n(x1 - third)},${n(y1 - tangent[i + 1]! * third)},${n(x1)},${n(y1)}`;
  }
  return path;
}

function makeCurve(segments: (points: readonly Point[], start: 'M' | 'L') => string): ChartCurve {
  return {
    line: (points) => (points.length ? segments(points, 'M') : ''),
    area: (top, bottom) => {
      if (!top.length) return '';
      // The top edge left to right, then the baseline back right to left with the same curve.
      return `${segments(top, 'M')}${segments([...bottom].reverse(), 'L')}Z`;
    },
  };
}

/** Straight lines between points. */
export const curveLinear: ChartCurve = makeCurve(linearSegments);

/** A smooth monotone curve: no overshoot above peaks or below dips. */
export const curveSmooth: ChartCurve = makeCurve(monotoneSegments);

export const chartCurves = { linear: curveLinear, smooth: curveSmooth } as const;
export type ChartCurveName = keyof typeof chartCurves;
