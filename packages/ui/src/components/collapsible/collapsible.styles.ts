import { tv } from '../../lib/tv';

export const collapsibleStyles = tv({
  slots: {
    root: 'flex flex-col',
    trigger: [
      'squircle group inline-flex items-center gap-2 rounded-item px-2.5 py-1.5 text-sm font-medium text-foreground outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:bg-hover focus-visible:ring-2 focus-visible:ring-ring',
      '[&_svg]:size-4 [&_svg]:shrink-0',
    ],
    chevron:
      'text-muted transition-transform duration-[var(--cui-duration-normal)] ease-ui group-data-[panel-open]:rotate-90 motion-reduce:transition-none',
    panel: [
      'h-[var(--collapsible-panel-height)] overflow-hidden',
      'transition-[height,opacity] duration-[var(--cui-duration-normal)] ease-ui motion-reduce:transition-none',
      'data-[starting-style]:h-0 data-[starting-style]:opacity-0 data-[ending-style]:h-0 data-[ending-style]:opacity-0',
    ],
  },
});
