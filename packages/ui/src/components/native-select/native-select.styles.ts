import { tv } from '../../lib/tv';
import { inputStyles } from '../input/input.styles';

export const nativeSelectStyles = tv({
  slots: {
    root: 'relative inline-flex w-full min-w-0 has-[select:disabled]:opacity-50',
    select: [
      inputStyles(),
      'cursor-default appearance-none truncate pe-9 disabled:opacity-100',
      '[&_option]:bg-popover [&_option]:text-foreground [&_optgroup]:bg-popover [&_optgroup]:text-muted',
    ],
    icon: 'pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted',
  },
  variants: {
    size: {
      sm: { select: 'h-control-sm rounded-control-sm ps-2.5 pe-8 text-sm', icon: 'end-2.5 size-3.5' },
      md: { select: 'h-control rounded-control ps-3.5' },
      lg: { select: 'h-control-lg rounded-control-lg ps-4 pe-10 text-base', icon: 'end-3.5' },
    },
  },
  defaultVariants: { size: 'md' },
});
