import { tv } from '../../lib/tv';

/**
 * Looks like a row of `Toggle`s: transparent items, muted text, and the pressed one on the soft
 * accent fill. In single mode the fill glides from item to item (a `motion` layout animation on
 * transform only); with `multiple` each pressed item gets its own fill.
 */
export const toggleGroupStyles = tv({
  slots: {
    root: 'squircle inline-flex items-center gap-1 p-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
    item: [
      'squircle relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap select-none border border-transparent',
      'font-[weight:var(--cui-control-weight)] text-muted outline-none',
      'transition-[background-color,color,transform] duration-[var(--cui-duration-fast)] ease-ui',
      'hover:bg-hover hover:text-foreground',
      'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent',
      'active:scale-[var(--cui-press-scale)]',
      'data-[pressed]:text-accent-soft-foreground data-[pressed]:hover:bg-transparent data-[pressed]:hover:text-accent-soft-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    ],
    // -inset-px: cover the item's (transparent) border too, so the fill has the item's exact outline
    indicator: 'squircle pointer-events-none absolute -inset-px -z-10 bg-accent-soft',
  },
  variants: {
    variant: {
      /** A thin frame around the items, for a segmented control. */
      outline: { root: 'border border-border' },
      /** No frame: a bare row of toggles, for toolbars. */
      ghost: { root: 'p-0' },
    },
    size: {
      sm: {
        root: 'rounded-[calc(var(--radius-control-sm)+5px)]',
        item: 'h-control-sm rounded-control-sm px-2.5 text-xs [&_svg]:size-3.5',
        indicator: 'rounded-control-sm',
      },
      md: {
        root: 'rounded-[calc(var(--radius-control)+5px)]',
        item: 'h-control rounded-control px-3.5 text-sm [&_svg]:size-4',
        indicator: 'rounded-control',
      },
      lg: {
        root: 'rounded-[calc(var(--radius-control-lg)+5px)]',
        item: 'h-control-lg rounded-control-lg px-4 text-base [&_svg]:size-5',
        indicator: 'rounded-control-lg',
      },
    },
    iconOnly: {
      true: { item: 'aspect-square px-0' },
    },
  },
  compoundVariants: [{ variant: 'ghost', size: ['sm', 'md', 'lg'], class: { root: 'rounded-none' } }],
  defaultVariants: { variant: 'outline', size: 'md' },
});
