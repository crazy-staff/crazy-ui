import { tv } from '../../lib/tv';

export const cardStyles = tv({
  slots: {
    root: [
      'squircle rounded-card border border-border bg-surface text-foreground shadow-card',
      'transition-[box-shadow,transform,border-color] duration-[var(--cui-duration-normal)] ease-ui',
    ],
    header: 'flex flex-col gap-1 p-5 pb-0',
    title: 'font-heading font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)] text-base',
    description: 'text-sm text-muted',
    body: 'p-5',
    footer: 'flex items-center gap-2 p-5 pt-0',
  },
  variants: {
    interactive: {
      true: {
        root: 'cursor-pointer hover:border-border-strong hover:shadow-card-hover hover:-translate-y-[var(--cui-card-lift)]',
      },
    },
  },
});
