import { tv } from '../../lib/tv';

/**
 * Tabs look like our Toggle: quiet ghost buttons, and the active one sits on a soft squircle fill
 * that glides between tabs. The `line` variant keeps the same hover fill and underlines the active
 * tab instead.
 */
export const tabsStyles = tv({
  slots: {
    root: 'flex flex-col gap-4',
    list: 'relative z-0 flex w-fit max-w-full items-center overflow-x-auto',
    tab: [
      'squircle relative z-10 inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap select-none',
      'font-[weight:var(--cui-control-weight)] text-muted outline-none',
      'transition-[background-color,color] duration-[var(--cui-duration-fast)] ease-ui',
      'hover:bg-hover hover:text-foreground data-[active]:hover:bg-transparent',
      'focus-visible:ring-[3px] focus-visible:ring-ring',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    ],
    // The indicator moves by width/translate. The squircle polyfill can't animate that in Firefox,
    // so it takes the native `corner-shape` only (a plain rounded box where unsupported).
    indicator: [
      'pointer-events-none absolute left-0 -z-10 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)]',
      'transition-[translate,width] duration-[var(--cui-duration-normal)] ease-ui motion-reduce:transition-none',
    ],
    panel: [
      'rounded-item outline-none focus-visible:ring-[3px] focus-visible:ring-ring',
      'transition-[opacity,translate] duration-[var(--cui-duration-normal)] ease-ui motion-reduce:transition-none',
      'data-[starting-style]:translate-y-1.5 data-[starting-style]:opacity-0 data-[ending-style]:hidden',
    ],
  },
  variants: {
    variant: {
      /** A soft fill glides behind the active tab (like a pressed Toggle). */
      pill: {
        list: 'gap-1',
        indicator: 'top-[var(--active-tab-top)] h-[var(--active-tab-height)] [corner-shape:var(--cui-corner-shape)]',
      },
      /** An underline glides under the active tab (page sections, install steps). */
      line: {
        list: 'gap-1 border-b border-border pb-1.5',
        indicator: [
          'bottom-[-1px] h-0.5 rounded-full',
          'w-[calc(var(--active-tab-width)-1.25rem)] translate-x-[calc(var(--active-tab-left)+0.625rem)]',
        ],
      },
    },
    size: {
      sm: { tab: 'text-xs [&_svg]:size-3.5' },
      md: { tab: 'text-sm [&_svg]:size-4' },
    },
    /** Active tab in the soft accent (default) or in a neutral fill. */
    accent: {
      true: { tab: 'data-[active]:text-accent-soft-foreground' },
      false: { tab: 'data-[active]:text-foreground' },
    },
  },
  compoundVariants: [
    { variant: 'pill', size: 'sm', class: { tab: 'h-control-sm rounded-control-sm px-3', indicator: 'rounded-control-sm' } },
    { variant: 'pill', size: 'md', class: { tab: 'h-control rounded-control px-4', indicator: 'rounded-control' } },
    { variant: 'line', size: 'sm', class: { tab: 'h-[calc(var(--cui-control-height)*0.7)] rounded-chip px-2.5' } },
    { variant: 'line', size: 'md', class: { tab: 'h-control-sm rounded-control-sm px-2.5' } },
    { variant: 'pill', accent: true, class: { indicator: 'bg-accent-soft' } },
    { variant: 'pill', accent: false, class: { indicator: 'bg-hover' } },
    { variant: 'line', accent: true, class: { indicator: 'bg-accent' } },
    { variant: 'line', accent: false, class: { indicator: 'bg-foreground' } },
  ],
  defaultVariants: { variant: 'pill', size: 'md', accent: true },
});
