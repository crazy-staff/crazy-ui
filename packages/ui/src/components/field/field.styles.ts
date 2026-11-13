import { tv } from '../../lib/tv';

export const fieldStyles = tv({
  slots: {
    root: 'flex flex-col gap-1.5',
    label: 'text-sm font-medium text-foreground data-[disabled]:opacity-50',
    description: 'text-xs text-muted',
    error: 'text-xs font-medium text-danger',
  },
});
