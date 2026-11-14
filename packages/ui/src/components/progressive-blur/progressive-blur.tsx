import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { progressiveBlurStyles } from './progressive-blur.styles';

type Side = 'top' | 'bottom' | 'left' | 'right';

export interface ProgressiveBlurProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'children'>,
    VariantProps<typeof progressiveBlurStyles> {
  /** The edge the blur grows towards. @default 'bottom' */
  side?: Side;
  /** How far the blur reaches in from the edge: pixels or any CSS length. @default 64 */
  size?: number | string;
  /** The blur at the edge, in pixels; it fades out inwards. @default 8 */
  strength?: number;
  /** Number of stacked layers; more is smoother and costs more. @default 8 */
  layers?: number;
  /**
   * Also fade towards a colour at the edge, so text under the blur disappears completely.
   * `true` uses the page background; pass a CSS colour (`var(--cui-surface)`) inside cards.
   */
  tint?: boolean | string;
  classNames?: { layer?: string; tint?: string };
}

/** The gradient direction runs from the inner edge of the overlay to the side it sits on. */
const direction: Record<Side, string> = { top: 'to top', bottom: 'to bottom', left: 'to left', right: 'to right' };
/** The inner edge of the overlay, where each layer's inset is measured from. */
const opposite: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

/**
 * Blurs whatever is behind it progressively towards one edge. Put it inside a positioned parent
 * (`relative`) over a scroll area, a card, an image or a list end; it never catches the pointer.
 *   <div className="relative"><ScrollArea …/><ProgressiveBlur side="bottom" size={72} /></div>
 */
export function ProgressiveBlur({
  side = 'bottom',
  size = 64,
  strength = 8,
  layers = 8,
  tint = false,
  className,
  classNames,
  style,
  ...props
}: ProgressiveBlurProps) {
  const s = progressiveBlurStyles({ side });
  const length = typeof size === 'number' ? `${size}px` : size;
  const vertical = side === 'top' || side === 'bottom';
  const count = Math.max(2, Math.round(layers));
  const to = direction[side];

  return (
    <div
      aria-hidden
      data-progressive-blur=""
      data-side={side}
      className={cn(s.root(), className)}
      style={{ [vertical ? 'height' : 'width']: length, ...style }}
      {...props}
    >
      {Array.from({ length: count }, (_, i) => {
        // Layer i starts i steps in from the inner edge and reaches the outer edge. Layers stack, so
        // the blur adds up towards the edge; each fades in over its first step so no band edge shows.
        // The geometry alone already makes the blur progressive: Chromium drops masks of backdrop
        // filters under a `corner-shape` clip (a squircle parent), and the result still degrades well.
        const blur = strength * ((i + 1) / count) * Math.sqrt(3 / count);
        const inset = `${(i / count) * 100}%`;
        const mask = `linear-gradient(${to}, transparent, black ${100 / (count - i)}%)`;
        const filter = `blur(${Math.round(blur * 100) / 100}px)`;
        return (
          <div
            key={i}
            className={cn(s.layer(), classNames?.layer)}
            style={{
              [opposite[side]]: inset,
              backdropFilter: filter,
              WebkitBackdropFilter: filter,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
      {tint && (
        <div
          className={cn(s.tint(), classNames?.tint)}
          style={{ backgroundImage: `linear-gradient(${to}, transparent, ${tint === true ? 'var(--cui-background)' : tint})` }}
        />
      )}
    </div>
  );
}
