import { type HTMLMotionProps, motion, useReducedMotion, type Variants } from 'motion/react';


const EASE = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE } },
};

export interface RevealProps extends HTMLMotionProps<'div'> {
  /** Seconds before the element starts to appear. */
  delay?: number;
  /** Animate only the first time it scrolls into view. @default true */
  once?: boolean;
}

/** Fades and lifts its content in when it scrolls into view. Static with reduced motion. */
function RevealRoot({ delay = 0, once = true, transition, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <motion.div {...props} />;
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: '0px 0px -48px 0px' }}
      variants={item}
      transition={{ delay, ...transition }}
      {...props}
    />
  );
}

export interface RevealGroupProps extends HTMLMotionProps<'div'> {
  /** Seconds between two children. @default 0.06 */
  stagger?: number;
  once?: boolean;
}

/** Reveals its `Reveal.Item` children one after another (cards in a grid, list rows). */
function RevealGroup({ stagger = 0.06, once = true, ...props }: RevealGroupProps) {
  const reduce = useReducedMotion();
  if (reduce) return <motion.div {...props} />;
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: '0px 0px -48px 0px' }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
      {...props}
    />
  );
}

function RevealItem(props: HTMLMotionProps<'div'>) {
  const reduce = useReducedMotion();
  return <motion.div variants={reduce ? undefined : item} {...props} />;
}

export const Reveal = Object.assign(RevealRoot, { Group: RevealGroup, Item: RevealItem });
export type { Variants };
export const revealEase = EASE;

