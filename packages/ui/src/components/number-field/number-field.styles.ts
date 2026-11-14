import { tv } from '../../lib/tv';

/**
 * Looks like `Input`: the group carries the border, the radius and the focus colour, the steppers sit
 * inside it as small ghost buttons with a concentric radius (group radius minus the 4px inset).
 * The input is a text input with `inputmode`, so there are never native spinner buttons.
 */
export const numberFieldStyles = tv({
  slots: {
    root: 'flex w-full flex-col gap-1.5',
    label: 'inline-flex w-fit items-center gap-1 text-sm font-medium text-foreground select-none',
    scrubArea: 'inline-flex w-fit cursor-ew-resize touch-none items-center select-none',
    scrubCursor: 'flex text-foreground drop-shadow-sm [&_svg]:size-5',
    group: [
      'squircle flex w-full items-center border border-input-border bg-input p-[3px] text-foreground',
      'transition-[border-color] duration-[var(--cui-duration-fast)] ease-ui',
      'focus-within:border-accent',
      'data-[invalid]:border-danger has-[[aria-invalid=true]]:border-danger',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      'data-[readonly]:bg-surface-2/60',
    ],
    input: [
      'h-full min-w-0 flex-1 bg-transparent px-1 text-center tabular-nums outline-none',
      'placeholder:text-muted disabled:cursor-not-allowed',
    ],
    button: [
      'squircle flex aspect-square h-full shrink-0 items-center justify-center border border-transparent text-muted outline-none select-none',
      'transition-[background-color,color,scale] duration-[var(--cui-duration-fast)] ease-ui',
      'hover:bg-hover hover:text-foreground focus-visible:border-accent focus-visible:text-foreground',
      'active:scale-[var(--cui-press-scale)]',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[readonly]:pointer-events-none data-[readonly]:opacity-40',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 rtl:[&_svg]:-scale-x-100',
    ],
    scrubHandle: 'flex h-full shrink-0 items-center px-1.5 text-muted hover:text-foreground [&_svg]:size-4',
  },
  variants: {
    size: {
      sm: {
        group: 'h-control-sm rounded-control-sm text-sm',
        button: 'rounded-[calc(var(--radius-control-sm)-4px)] [&_svg]:size-3.5',
      },
      md: {
        group: 'h-control rounded-control text-sm',
        button: 'rounded-[calc(var(--radius-control)-4px)] [&_svg]:size-4',
      },
      lg: {
        group: 'h-control-lg rounded-control-lg text-base',
        button: 'rounded-[calc(var(--radius-control-lg)-4px)] [&_svg]:size-[1.125rem]',
      },
    },
  },
  defaultVariants: { size: 'md' },
});
