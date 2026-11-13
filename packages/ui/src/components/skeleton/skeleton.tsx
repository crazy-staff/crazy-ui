import { motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { skeletonStyles } from './skeleton.styles';

const SHIMMER = 'linear-gradient(90deg, transparent 0%, var(--cui-hover) 50%, transparent 100%)';

export interface SkeletonProps
  extends Omit<React.ComponentPropsWithRef<'span'>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationEnd'>,
    VariantProps<typeof skeletonStyles> {
  /** Lines of text to fake; the last one is shorter. */
  lines?: number;
}

function Bar({ className, shape, style, ...props }: SkeletonProps) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={cn(skeletonStyles({ shape }), className)}
      style={{ backgroundImage: reduce ? undefined : SHIMMER, backgroundSize: '200% 100%', ...style }}
      animate={reduce ? undefined : { backgroundPositionX: ['150%', '-50%'] }}
      transition={reduce ? undefined : { duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
      {...(props as object)}
    />
  );
}

/** A placeholder while content loads. A soft shimmer runs across it unless motion is reduced. */
export function Skeleton({ lines, className, ...props }: SkeletonProps) {
  if (lines && lines > 1) {
    return (
      <span className={cn('flex w-full flex-col gap-2', className)} aria-hidden>
        {Array.from({ length: lines }, (_, i) => (
          <Bar key={i} shape="line" {...props} className={i === lines - 1 ? 'w-3/5' : undefined} />
        ))}
      </span>
    );
  }
  return <Bar className={className} {...props} />;
}
