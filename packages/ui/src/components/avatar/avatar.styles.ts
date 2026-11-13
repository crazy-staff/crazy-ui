import { tv } from '../../lib/tv';

/** Avatars stay circular (like the switch): a face reads best in a circle. */
export const avatarStyles = tv({
  slots: {
    root: 'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2 align-middle select-none border border-border',
    image: 'size-full object-cover',
    fallback: 'flex size-full items-center justify-center font-medium text-muted',
  },
  variants: {
    size: {
      sm: { root: 'size-7', fallback: 'text-[0.6875rem]' },
      md: { root: 'size-9', fallback: 'text-xs' },
      lg: { root: 'size-12', fallback: 'text-sm' },
    },
  },
  defaultVariants: { size: 'md' },
});
