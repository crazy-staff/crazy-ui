import { tv } from '../../lib/tv';

export const toggleStyles = tv({
  base: [
    'squircle inline-flex items-center justify-center gap-2 whitespace-nowrap select-none',
    'font-[weight:var(--cui-control-weight)] text-muted outline-none',
    'transition-[background-color,color,transform] duration-[var(--cui-duration-fast)] ease-ui',
    'hover:bg-hover hover:text-foreground',
    // an outline, not a ring: a ring is a box-shadow, which the squircle polyfill paints as a filled
    // shape on a transparent background
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    'active:scale-[var(--cui-press-scale)]',
    'data-[pressed]:bg-accent-soft data-[pressed]:text-accent-soft-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  variants: {
    variant: {
      ghost: '',
      outline: 'border border-border-strong data-[pressed]:border-transparent',
    },
    size: {
      sm: 'h-control-sm rounded-control-sm px-2.5 text-xs [&_svg]:size-3.5',
      md: 'h-control rounded-control px-3 text-sm [&_svg]:size-4',
      lg: 'h-control-lg rounded-control-lg px-4 text-base [&_svg]:size-5',
      'icon-sm': 'size-control-sm rounded-control-sm [&_svg]:size-3.5',
      icon: 'size-control rounded-control [&_svg]:size-4',
      'icon-lg': 'size-control-lg rounded-control-lg [&_svg]:size-5',
    },
  },
  defaultVariants: { variant: 'ghost', size: 'md' },
});
