import { tv } from '../../lib/tv';

/**
 * Items keep a little space around the trigger, so the hover fill is an inset squircle with
 * padding of its own instead of a band that runs into the text.
 */
export const accordionStyles = tv({
  slots: {
    root: 'flex w-full flex-col',
    item: 'p-1.5',
    header: 'm-0',
    trigger: [
      'squircle group flex w-full items-center justify-between gap-4 rounded-item px-3.5 py-3 text-start text-sm font-medium text-foreground outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:bg-hover focus-visible:bg-hover',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:shrink-0',
    ],
    chevron:
      'size-4 shrink-0 text-muted transition-transform duration-[var(--cui-duration-normal)] ease-ui group-data-[panel-open]:rotate-180 motion-reduce:transition-none',
    panel: [
      'h-[var(--accordion-panel-height)] overflow-hidden text-sm text-muted',
      'transition-[height,opacity] duration-[var(--cui-duration-normal)] ease-ui motion-reduce:transition-none',
      'data-[starting-style]:h-0 data-[starting-style]:opacity-0 data-[ending-style]:h-0 data-[ending-style]:opacity-0',
    ],
    content: 'px-3.5 pt-1.5 pb-3 leading-relaxed',
  },
  variants: {
    variant: {
      /** Items in one bordered card, divided by lines. */
      card: {
        root: 'squircle overflow-hidden rounded-card border border-border bg-surface',
        item: 'border-b border-border last:border-b-0',
      },
      /** Separate cards with a gap between them. */
      separated: {
        root: 'gap-2',
        item: 'squircle rounded-card border border-border bg-surface',
      },
      /** No frame: rows divided by lines, for FAQs inside a page. */
      plain: {
        item: 'border-b border-border px-0 last:border-b-0',
      },
    },
  },
  defaultVariants: { variant: 'card' },
});
