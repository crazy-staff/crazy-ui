import { tv } from '../../lib/tv';

export const radioGroupStyles = tv({
  slots: {
    group: 'flex flex-col gap-2.5',
    radio: [
      'inline-flex size-[1.125rem] shrink-0 items-center justify-center rounded-full',
      'border border-muted/70 bg-input outline-none',
      'transition-[background-color,border-color] duration-[var(--cui-duration-fast)] ease-ui',
      'focus-visible:border-accent data-[checked]:border-accent data-[checked]:bg-accent',
      'data-[invalid]:border-danger data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    ],
    indicator: [
      'size-2 rounded-full bg-accent-foreground',
      'transition-transform duration-[var(--cui-duration-normal)] ease-spring',
      'data-[unchecked]:scale-0 data-[starting-style]:scale-0',
    ],
    item: 'flex cursor-pointer items-start gap-2.5 text-sm text-foreground has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50',
    text: 'flex flex-col gap-0.5 leading-[1.125rem]',
    description: 'text-xs text-muted',
  },
});
