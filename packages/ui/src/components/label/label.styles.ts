import { tv } from '../../lib/tv';

export const labelStyles = tv({
  slots: {
    base: [
      'inline-flex items-center gap-1 text-sm font-medium text-foreground select-none',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    ],
    required: 'text-danger',
  },
});
