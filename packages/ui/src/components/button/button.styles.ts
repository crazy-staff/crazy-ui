import { tv } from '../../lib/tv';

export const buttonStyles = tv({
  base: [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap select-none',
    'squircle border font-[weight:var(--cui-control-weight)]',
    'outline-none transition-[transform,background-color,border-color,box-shadow,color]',
    'duration-[var(--cui-duration-fast)] ease-spring',
    'focus-visible:ring-[3px] focus-visible:ring-ring',
    'active:scale-[var(--cui-press-scale)]',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  variants: {
    variant: {
      solid: 'border-transparent bg-accent text-accent-foreground shadow-button hover:brightness-105',
      soft: 'border-transparent bg-accent-soft text-accent-soft-foreground hover:brightness-105',
      outline:
        'border-border-strong bg-transparent text-foreground hover:bg-surface-2',
      ghost: 'border-transparent bg-transparent text-foreground hover:bg-surface-2',
      danger: 'border-transparent bg-danger text-danger-foreground hover:brightness-105',
    },
    size: {
      sm: 'h-control-sm rounded-control-sm px-3 text-xs [&_svg]:size-3.5',
      md: 'h-control rounded-control px-4 text-sm [&_svg]:size-4',
      lg: 'h-control-lg rounded-control-lg px-5 text-base [&_svg]:size-5',
      icon: 'h-control w-control rounded-control [&_svg]:size-4',
      'icon-sm': 'h-control-sm w-control-sm rounded-control-sm [&_svg]:size-3.5',
    },
    /** A soft accent glow under solid buttons. Off by default; use it for the one main action. */
    glow: {
      true: 'shadow-glow',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    glow: false,
  },
});
