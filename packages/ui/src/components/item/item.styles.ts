import { tv } from '../../lib/tv';

/**
 * A list row: media, title + description, actions. `outline` and `muted` frame it like a small card;
 * `plain` (default) leaves it bare for use inside a group. Rows that are links or buttons get a soft
 * hover fill (background-color only, which the squircle fallback can paint).
 */
export const itemStyles = tv({
  slots: {
    root: [
      'squircle group/item relative flex w-full items-center gap-3.5 rounded-item text-start text-sm text-foreground outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] ease-ui',
      'focus-visible:ring-[3px] focus-visible:ring-ring',
      '[a]:cursor-pointer [a]:hover:bg-hover [button]:cursor-pointer [button]:hover:bg-hover',
    ],
    media: 'flex shrink-0 items-center justify-center [&_svg]:pointer-events-none',
    content: 'flex min-w-0 flex-1 flex-col gap-0.5',
    title: 'flex min-w-0 items-center gap-2 font-medium leading-snug',
    description: 'line-clamp-2 text-sm leading-normal text-muted text-pretty [&_a]:underline [&_a]:underline-offset-2',
    actions: 'flex shrink-0 items-center gap-2',
    header: 'flex basis-full items-center justify-between gap-2',
    footer: 'flex basis-full items-center justify-between gap-2',
  },
  variants: {
    variant: {
      plain: { root: 'border border-transparent' },
      outline: { root: 'border border-border bg-surface' },
      muted: { root: 'border border-transparent bg-surface-2/70' },
    },
    size: {
      sm: { root: 'gap-2.5 px-3 py-2' },
      md: { root: 'px-4 py-3' },
    },
  },
  defaultVariants: { variant: 'plain', size: 'md' },
});

export const itemMediaStyles = tv({
  base: 'flex shrink-0 items-center justify-center [&_svg]:pointer-events-none',
  variants: {
    variant: {
      /** Anything: an avatar, a custom element. */
      default: 'self-start',
      /** A tinted squircle tile with the icon in accent ink. */
      icon: 'squircle size-9 rounded-control-sm bg-accent-soft text-accent-soft-foreground [&_svg]:size-4.5',
      /** A picture cropped to a tile. */
      image: 'squircle size-10 overflow-hidden rounded-control-sm [&_img]:size-full [&_img]:object-cover',
    },
  },
  defaultVariants: { variant: 'default' },
});

export const itemGroupStyles = tv({
  slots: {
    root: 'flex w-full flex-col',
    separator: 'mx-4 h-px shrink-0 bg-border',
  },
  variants: {
    /** Rows inside one shared frame, divided by hairlines. */
    framed: {
      true: { root: 'squircle rounded-card border border-border bg-surface p-1' },
      false: { root: 'gap-2' },
    },
  },
  defaultVariants: { framed: false },
});
