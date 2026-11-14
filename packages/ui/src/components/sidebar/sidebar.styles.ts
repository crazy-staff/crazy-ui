import { tv } from '../../lib/tv';
import { backdropStyles } from '../popover/popover.styles';

/**
 * The app sidebar of crazy-hub: it sits on the frame colour next to the page panel (the framed app
 * layout). Rows are muted; the active row has the soft accent fill; one neutral block glides under
 * the hovered row (see glide.ts). Collapsing hides the sidebar completely: the column closes and the
 * content slides out a little and fades. On phones it is a drawer from the left.
 */
export const sidebarStyles = tv({
  slots: {
    provider: 'group/provider flex min-h-svh w-full bg-frame text-foreground [--sidebar-width:16rem]',
    aside: [
      'group/sidebar relative shrink-0 self-stretch overflow-clip max-md:hidden',
      'w-(--sidebar-width) transition-[width] duration-[var(--cui-duration-normal)] ease-ui data-[state=collapsed]:w-0',
    ],
    column: [
      'sticky top-0 flex h-full max-h-svh w-(--sidebar-width) flex-col text-sm',
      'transition-[translate,opacity] duration-[var(--cui-duration-normal)] ease-ui',
      'group-data-[state=collapsed]/sidebar:-translate-x-3 group-data-[state=collapsed]/sidebar:opacity-0',
    ],
    area: 'relative flex min-h-0 flex-1 flex-col',
    header: 'flex shrink-0 items-center gap-2 px-4 pt-4 pb-2',
    content: 'flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain px-3 py-3 mask-t-from-[calc(100%-12px)] mask-b-from-[calc(100%-24px)]',
    footer: 'flex shrink-0 flex-col gap-1 px-3 pt-2 pb-4',
    separator: 'mx-3 h-px shrink-0 bg-border',
    group: 'flex flex-col',
    groupLabel: 'mb-1.5 flex items-center gap-2 px-2.5 text-xs font-medium text-muted [&_svg]:size-3.5',
    list: 'flex flex-col gap-0.5',
    item: [
      'squircle-motion relative my-0.5 flex w-full items-center gap-3 rounded-item px-2.5 py-2 text-start text-sm wrap-anywhere outline-none',
      'text-muted transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:text-foreground',
      'focus-visible:ring-2 focus-visible:ring-ring',
      'data-[active=true]:bg-accent-soft data-[active=true]:font-medium data-[active=true]:text-accent-soft-foreground',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      '[&_svg]:size-4 [&_svg]:shrink-0',
    ],
    badge: 'ms-auto text-xs tabular-nums text-muted',
    sub: 'relative ms-3 flex flex-col gap-0.5 ps-1 before:absolute before:inset-y-1 before:start-0 before:w-px before:bg-border before:content-[""]',
    inset: [
      'squircle relative m-2 flex min-w-0 flex-1 flex-col rounded-panel border border-border bg-background',
      'md:ms-0 md:group-data-[sidebar=collapsed]/provider:ms-2',
    ],
    // the same 32px button with a 16px icon as the docs sidebar's collapse button
    trigger: 'size-8 rounded-control-sm text-muted hover:text-foreground [&_svg]:size-4',
    backdrop: [backdropStyles, 'md:hidden'],
    drawer: [
      'squircle fixed inset-y-2 left-2 z-50 flex w-[min(var(--sidebar-width),calc(100vw-3rem))] flex-col overflow-hidden rounded-card',
      'border border-border bg-frame text-[0.9375rem] text-foreground shadow-overlay outline-none md:hidden',
      'transition-[translate,opacity] duration-[var(--cui-duration-normal)] ease-ui',
      'data-[starting-style]:-translate-x-[calc(100%+1rem)] data-[ending-style]:-translate-x-[calc(100%+1rem)]',
    ],
  },
});
