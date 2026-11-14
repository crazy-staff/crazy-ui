import { tv } from '../../lib/tv';

export const switchStyles = tv({
  slots: {
    root: [
      'group relative inline-flex shrink-0 items-center rounded-switch p-0.5',
      'border border-transparent bg-border-strong',
      'outline-none transition-colors duration-[var(--cui-duration-normal)] ease-ui',
      'focus-visible:ring-[3px] focus-visible:ring-ring',
      'data-[checked]:bg-accent',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      'data-[invalid]:border-danger',
    ],
    thumb: [
      'block rounded-switch bg-background shadow-control',
      'transition-transform duration-[var(--cui-duration-normal)] ease-spring',
      'data-[checked]:bg-accent-foreground',
    ],
    label: [
      'flex cursor-pointer items-center justify-between gap-4 text-sm text-foreground select-none',
      'has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50',
    ],
    text: 'flex flex-col gap-0.5',
    description: 'text-xs text-muted',
  },
  variants: {
    size: {
      sm: { root: 'h-4 w-7', thumb: 'size-3 data-[checked]:translate-x-3' },
      md: { root: 'h-5 w-9', thumb: 'size-4 data-[checked]:translate-x-4' },
      lg: { root: 'h-6 w-11', thumb: 'size-5 data-[checked]:translate-x-5' },
    },
  },
  defaultVariants: { size: 'md' },
});
