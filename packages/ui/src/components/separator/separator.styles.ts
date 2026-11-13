import { tv } from '../../lib/tv';

export const separatorStyles = tv({
  slots: {
    root: 'shrink-0 bg-border',
    labelled: 'flex items-center gap-3 text-xs text-muted',
    line: 'h-px flex-1 bg-border',
  },
  variants: {
    orientation: {
      horizontal: { root: 'h-px w-full' },
      vertical: { root: 'h-auto w-px self-stretch' },
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});
