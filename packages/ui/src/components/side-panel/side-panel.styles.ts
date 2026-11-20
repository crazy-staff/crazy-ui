import { tv } from '../../lib/tv';

/**
 * A management panel (moderation, quick admin) in the page's right column on a wide screen and in a
 * bottom drawer on a narrow one, opened by one icon button among the page's own controls.
 */
export const sidePanelStyles = tv({
  slots: {
    panel: 'squircle flex flex-col gap-5 rounded-card border border-border bg-surface p-5',
    header: '-mt-1 -me-1 flex items-center justify-between gap-2',
    title: 'text-base font-semibold text-foreground',
    // the drawer's title already separates: no line above the first section
    drawerBody: 'flex flex-col gap-6 pt-2 pb-6 [&>[role=group]:first-child]:border-t-0 [&>[role=group]:first-child]:pt-0',
    /** The open button while the column is shown: pressed, on the soft accent. */
    pressed: 'border-accent/40 bg-accent-soft text-accent-soft-foreground hover:bg-accent-soft',
    section: 'flex flex-col gap-2.5 border-t border-border pt-4',
    sectionHead: 'flex min-h-7 items-center gap-2',
    sectionLabel: 'flex items-center gap-2 text-xs font-medium text-muted [&_svg]:size-4',
    sectionActions: 'ms-auto flex items-center gap-1',
  },
  variants: {
    touch: {
      true: { section: 'gap-3 pt-5', sectionHead: 'min-h-10', sectionLabel: 'text-sm' },
    },
  },
});
