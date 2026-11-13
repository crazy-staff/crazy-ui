import { tv } from '../../lib/tv';

export const buttonStyles = tv({
  base: [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap select-none',
    'font-[weight:var(--cui-control-weight)] rounded-control',
    'outline-none transition-[transform,background-color,border-color,box-shadow,color]',
    'duration-[var(--cui-duration-fast)] ease-ui',
    'focus-visible:ring-[3px] focus-visible:ring-ring',
    'active:scale-[var(--cui-press-scale)]',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  variants: {
    variant: {
      solid: 'bg-accent text-accent-foreground shadow-button hover:brightness-110',
      soft: 'bg-accent-soft text-accent-soft-foreground hover:brightness-105',
      outline:
        'border border-border-strong bg-transparent text-foreground shadow-control hover:bg-surface-2',
      ghost: 'bg-transparent text-foreground hover:bg-surface-2',
      danger: 'bg-danger text-danger-foreground shadow-button hover:brightness-110',
    },
    size: {
      sm: 'h-control-sm px-3 text-xs [&_svg]:size-3.5',
      md: 'h-control px-4 text-sm [&_svg]:size-4',
      lg: 'h-control-lg px-5 text-base [&_svg]:size-5',
      icon: 'h-control w-control [&_svg]:size-4',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});
