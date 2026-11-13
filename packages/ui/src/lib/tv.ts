import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { createTV } from 'tailwind-variants/config';

/**
 * tailwind-merge has to know our theme keys, otherwise it can't tell that
 * `rounded-card` overrides `rounded-control` or that `h-control` is a height.
 * The same config feeds both `cn()` and the `tv()` factory so a single merge
 * table is used everywhere.
 */
export const twMergeConfig = {
  extend: {
    theme: {
      color: [
        'background',
        'foreground',
        'frame',
        'popover',
        'hover',
        'surface',
        'surface-2',
        'muted',
        'border',
        'border-strong',
        'input',
        'input-border',
        'ring',
        'accent',
        'accent-foreground',
        'accent-soft',
        'accent-soft-foreground',
        'danger',
        'danger-foreground',
        'success',
        'warning',
      ],
      radius: ['chip', 'control-sm', 'control', 'control-lg', 'item', 'card', 'panel', 'switch'],
      shadow: ['control', 'button', 'card', 'card-hover', 'overlay'],
      font: ['sans', 'mono', 'heading'],
      spacing: ['control', 'control-sm', 'control-lg'],
      ease: ['ui', 'spring'],
    },
  },
} as const;

const twMerge = extendTailwindMerge(twMergeConfig);

/** Join class names and resolve Tailwind conflicts (last one wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** `tv` preconfigured with our tailwind-merge table. */
export const tv = createTV({ twMergeConfig });

export type { VariantProps } from 'tailwind-variants';
