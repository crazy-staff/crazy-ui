import { tv } from '../../lib/tv';

export const tabsStyles = tv({
  slots: {
    root: 'flex flex-col gap-4',
    list: 'relative z-0 flex w-fit max-w-full items-center overflow-x-auto',
    tab: [
      'relative z-10 inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-[weight:var(--cui-control-weight)] outline-none',
      'text-muted transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:text-foreground',
      'data-[active]:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
    ],
    // no `squircle` here: the indicator moves by width/translate, which the squircle polyfill
    // would not animate in Firefox
    indicator: [
      'absolute left-0 -z-10 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)]',
      'transition-[translate,width] duration-[var(--cui-duration-normal)] ease-ui motion-reduce:transition-none',
    ],
    panel: 'outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-item',
  },
  variants: {
    variant: {
      /** A filled block glides behind the active tab (segmented control). */
      pill: {
        list: 'squircle gap-0.5 rounded-control-sm border border-border bg-surface-2/60 p-0.5',
        tab: 'h-[calc(var(--cui-control-height)*0.78-6px)] rounded-[calc(var(--cui-radius-control-sm)*var(--corner-scale,1)-3px)] px-3',
        indicator:
          'top-[var(--active-tab-top)] h-[var(--active-tab-height)] rounded-[calc(var(--cui-radius-control-sm)*var(--corner-scale,1)-3px)] bg-background shadow-control',
      },
      /** An underline glides under the active tab (page sections). */
      line: {
        list: 'gap-1 border-b border-border',
        tab: 'h-control px-3',
        indicator: 'bottom-[-1px] h-0.5 rounded-full bg-accent',
      },
    },
  },
  defaultVariants: { variant: 'pill' },
});
