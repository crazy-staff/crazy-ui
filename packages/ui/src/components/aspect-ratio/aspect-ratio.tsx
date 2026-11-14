import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { aspectRatioStyles } from './aspect-ratio.styles';

export interface AspectRatioProps extends React.ComponentPropsWithRef<'div'>, VariantProps<typeof aspectRatioStyles> {
  /** Width / height, e.g. `16 / 9`. @default 1 */
  ratio?: number;
}

/** Keeps its content (image, video, map) at a fixed ratio; media inside fills it. */
export function AspectRatio({ ratio = 1, rounded, className, style, ...props }: AspectRatioProps) {
  return <div className={cn(aspectRatioStyles({ rounded }), className)} style={{ aspectRatio: String(ratio), ...style }} {...props} />;
}
