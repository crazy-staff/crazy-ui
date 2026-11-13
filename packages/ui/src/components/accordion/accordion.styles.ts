import { tv } from '../../lib/tv';

export const accordionStyles = tv({
  slots: {
    root: 'squircle flex w-full flex-col overflow-hidden rounded-card border border-border bg-surface',
    item: 'border-b border-border last:border-b-0',
    header: 'm-0',
    trigger: [
      'group flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-sm font-medium text-foreground outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:bg-hover focus-visible:bg-hover',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    ],
    chevron:
      'size-4 shrink-0 text-muted transition-transform duration-[var(--cui-duration-normal)] ease-ui group-data-[panel-open]:rotate-180 motion-reduce:transition-none',
    panel: [
      'h-[var(--accordion-panel-height)] overflow-hidden text-sm text-muted',
      'transition-[height,opacity] duration-[var(--cui-duration-normal)] ease-ui motion-reduce:transition-none',
      'data-[starting-style]:h-0 data-[starting-style]:opacity-0 data-[ending-style]:h-0 data-[ending-style]:opacity-0',
    ],
    content: 'px-5 pb-4',
  },
});
