import { tv } from '../../lib/tv';
import { popupSurface } from '../popover/popover.styles';

const duration = 'duration-[var(--cui-duration-normal)] ease-ui';

export const navigationMenuStyles = tv({
  slots: {
    root: 'relative w-fit max-w-full',
    list: 'relative z-0 flex items-center gap-0.5',
    // No `squircle`: it glides by translate/width, which the squircle polyfill would not animate. It takes
    // the native `corner-shape`; where that's missing (Firefox/Zen) a smaller plain radius stands in, so
    // the block reads like the squircle items of the sidebar and menus instead of a pill.
    indicator: [
      'pointer-events-none absolute top-0 left-0 -z-10 h-full w-(--nav-indicator-width) translate-x-(--nav-indicator-left) bg-hover',
      'rounded-control-sm [corner-shape:var(--cui-corner-shape)] not-supports-[corner-shape:squircle]:rounded-chip',
      `transition-[translate,width,opacity] ${duration} data-[hidden]:opacity-0 data-[instant]:transition-opacity motion-reduce:transition-none`,
    ],
    trigger: [
      'inline-flex h-control-sm cursor-default items-center gap-1 rounded-control-sm px-3 text-sm whitespace-nowrap',
      'font-[weight:var(--cui-control-weight)] text-muted no-underline outline-none select-none',
      'transition-colors duration-[var(--cui-duration-fast)] hover:text-foreground focus-visible:text-foreground',
      'data-[popup-open]:text-foreground data-[active]:text-foreground aria-[current=page]:text-foreground',
      'focus-visible:ring-2 focus-visible:ring-ring',
    ],
    icon: `flex size-3.5 transition-transform ${duration} data-[popup-open]:rotate-180 [&_svg]:size-3.5`,
    content: [
      'w-[calc(100vw-2rem)] p-2 sm:w-max',
      `transition-[opacity,translate] ${duration}`,
      'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
      'data-[starting-style]:data-[activation-direction=left]:-translate-x-1/3',
      'data-[starting-style]:data-[activation-direction=right]:translate-x-1/3',
      'data-[ending-style]:data-[activation-direction=left]:translate-x-1/3',
      'data-[ending-style]:data-[activation-direction=right]:-translate-x-1/3',
    ],
    positioner: [
      'z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)',
      `transition-[top,left,right,bottom] ${duration} data-[instant]:transition-none`,
      // an invisible bridge over the gap so the pointer can travel from trigger to panel
      "before:absolute before:inset-x-0 before:-top-2.5 before:h-2.5 before:content-['']",
    ],
    popup: [
      popupSurface,
      'relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-card',
      `transition-[opacity,scale,width,height] ${duration}`,
      'data-[starting-style]:scale-96 data-[starting-style]:opacity-0 data-[ending-style]:scale-96 data-[ending-style]:opacity-0',
    ],
    viewport: 'relative h-full w-full overflow-hidden',
    cardList: 'grid gap-1 sm:w-[30rem] sm:grid-cols-2',
    card: [
      'squircle flex gap-3 rounded-item p-3 text-start no-underline outline-none',
      'transition-colors duration-[var(--cui-duration-fast)] hover:bg-hover focus-visible:bg-hover',
    ],
    cardIcon: 'squircle flex size-9 shrink-0 items-center justify-center rounded-control-sm bg-accent-soft text-accent-soft-foreground [&_svg]:size-4',
    cardTitle: 'text-sm font-medium text-foreground',
    cardDescription: 'mt-0.5 text-sm leading-snug text-muted',
  },
});
