import { tv } from '../../lib/tv';

export const breadcrumbStyles = tv({
  slots: {
    root: '',
    list: 'flex flex-wrap items-center gap-1.5 text-sm text-muted',
    item: 'inline-flex min-w-0 items-center gap-1.5',
    link: [
      'squircle -mx-1 truncate rounded-chip px-1 py-0.5 outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
    ],
    page: 'truncate font-medium text-foreground',
    separator: 'text-muted/60 [&_svg]:size-3.5',
  },
});
