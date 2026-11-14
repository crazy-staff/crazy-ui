import { tv } from '../../lib/tv';
import { inputStyles } from '../input/input.styles';

export const datePickerStyles = tv({
  slots: {
    trigger: [
      inputStyles(),
      'min-w-56 cursor-default justify-between gap-2 text-start select-none',
      'data-[popup-open]:border-accent',
    ],
    value: 'truncate',
    placeholder: 'truncate text-muted',
    icon: 'size-4 shrink-0 text-muted',
    popup: 'w-auto p-0',
    calendar: 'border-0 bg-transparent',
  },
  variants: {
    size: {
      sm: { trigger: 'h-control-sm rounded-control-sm px-2.5 text-sm' },
      md: { trigger: 'h-control rounded-control px-3.5' },
      lg: { trigger: 'h-control-lg rounded-control-lg px-4 text-base' },
    },
  },
  defaultVariants: { size: 'md' },
});
