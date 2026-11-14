import { tv } from '../../lib/tv';

export const menubarStyles = tv({
  slots: {
    root: 'squircle flex w-fit items-center gap-0.5 rounded-control border border-border bg-surface p-1',
    trigger: [
      'squircle inline-flex h-[calc(var(--cui-control-height)*0.78)] cursor-default items-center gap-1.5 rounded-item px-3 text-sm',
      'font-[weight:var(--cui-control-weight)] text-foreground outline-none select-none',
      'hover:bg-hover focus-visible:bg-hover data-[popup-open]:bg-hover data-[pressed]:bg-hover',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4',
    ],
  },
});
