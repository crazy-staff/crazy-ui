import { tv } from '../../lib/tv';
import { popupMotion, popupSurface } from '../popover/popover.styles';

export const comboboxStyles = tv({
  slots: {
    inputGroup: [
      'squircle relative flex w-full cursor-text items-center border border-input-border bg-input text-sm text-foreground',
      'transition-[border-color] duration-[var(--cui-duration-fast)] ease-ui',
      'focus-within:border-accent has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
      'has-[[aria-invalid=true]]:border-danger',
    ],
    input: 'h-full min-w-12 flex-1 bg-transparent outline-none placeholder:text-muted disabled:cursor-not-allowed',
    actions: 'flex shrink-0 items-center gap-0.5',
    action: [
      'flex size-6 shrink-0 cursor-default items-center justify-center rounded-chip text-muted outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] hover:text-foreground focus-visible:text-foreground',
      'data-[popup-open]:text-foreground [&_svg]:size-4',
    ],
    chips: 'flex min-w-0 flex-1 flex-wrap items-center gap-1',
    chip: [
      'squircle inline-flex h-6 max-w-full cursor-default items-center gap-0.5 rounded-chip bg-surface-2 ps-2 pe-0.5 text-xs font-medium text-foreground outline-none',
      'focus:bg-accent-soft focus:text-accent-soft-foreground',
    ],
    chipRemove: [
      'flex size-5 shrink-0 cursor-default items-center justify-center rounded-[calc(var(--radius-chip)*0.75)] text-muted outline-none',
      'hover:text-foreground [&_svg]:size-3',
    ],
    positioner: 'z-50 outline-none',
    popup: [
      popupSurface,
      popupMotion,
      'w-(--anchor-width) max-w-(--available-width) max-h-[min(var(--available-height),22rem)] overflow-y-auto overscroll-contain rounded-control p-1 text-sm',
    ],
    list: 'outline-none data-[empty]:p-0',
    item: [
      'squircle relative flex min-h-8 cursor-default items-center gap-2 rounded-item py-1.5 ps-2.5 pe-8 outline-none select-none',
      'data-[highlighted]:bg-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'data-[selected]:font-medium data-[selected]:text-accent-soft-foreground',
      '[&_svg]:size-4 [&_svg]:shrink-0 [&>svg]:text-muted',
    ],
    itemIndicator: 'absolute end-2.5 flex text-accent-soft-foreground [&_svg]:size-4',
    empty: 'px-3 py-5 text-center text-sm text-muted empty:p-0',
    group: 'not-last:mb-1',
    groupLabel: 'px-2.5 pt-2 pb-1 text-xs font-medium text-muted',
    separator: 'mx-1 my-1 h-px bg-border',
  },
  variants: {
    size: {
      sm: { inputGroup: 'min-h-control-sm rounded-control-sm gap-1.5 ps-2.5 pe-1' },
      md: { inputGroup: 'min-h-control rounded-control gap-2 ps-3.5 pe-1.5' },
      lg: { inputGroup: 'min-h-control-lg rounded-control-lg gap-2 ps-4 pe-2 text-base' },
    },
    multiple: {
      true: { inputGroup: 'py-1 ps-1.5', input: 'h-6 ps-1' },
      false: { input: 'self-stretch' },
    },
  },
  defaultVariants: { size: 'md', multiple: false },
});
