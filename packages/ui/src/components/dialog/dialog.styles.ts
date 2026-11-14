import { tv } from '../../lib/tv';
import { backdropStyles, popupSurface } from '../popover/popover.styles';

export const dialogStyles = tv({
  slots: {
    backdrop: backdropStyles,
    popup: [
      popupSurface,
      'fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-card p-6',
      'transition-[opacity,scale] duration-[var(--cui-duration-normal)] ease-ui',
      'data-[starting-style]:scale-96 data-[starting-style]:opacity-0 data-[ending-style]:scale-96 data-[ending-style]:opacity-0',
    ],
    header: 'flex flex-col gap-1.5 pe-8',
    title: 'font-heading text-lg font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)] text-foreground',
    description: 'text-sm text-muted',
    body: 'mt-4 text-sm',
    footer: 'mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
    close: 'absolute top-4 right-4',
  },
  variants: {
    size: {
      sm: { popup: 'max-w-sm' },
      md: { popup: 'max-w-lg' },
      lg: { popup: 'max-w-2xl' },
    },
  },
  defaultVariants: { size: 'md' },
});
