import { tv } from '../../lib/tv';

/**
 * Highlighted code in a squircle frame. Shiki paints each token with `light-dark(light, dark)`, so the
 * colours follow `color-scheme`, which the theme sets on `.dark`: no `dark:` variant, no second pass.
 * Lines are blocks in a grid (one row each) so highlights span the full scroll width; line numbers are
 * a CSS counter. The line height is fixed (1.5rem) because the copy button is centred on line one.
 */
export const codeBlockStyles = tv({
  slots: {
    root: 'squircle group/code relative w-full overflow-hidden rounded-card border border-border bg-surface text-foreground',
    header: 'flex h-11 items-center gap-2 border-b border-border px-4 text-[0.8125rem] text-muted [&_svg]:size-3.5 [&_svg]:shrink-0',
    title: 'min-w-0 truncate font-mono',
    body: 'relative',
    pre: [
      'overflow-x-auto py-3.5 font-mono text-[0.8125rem] leading-6 outline-none',
      'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
      '[&_code]:grid [&_code]:w-max [&_code]:min-w-full [&_code]:[counter-reset:line]',
      '[&_.line]:block [&_.line]:min-h-6 [&_.line]:ps-4 [&_.line]:pe-14',
      '[&_.line[data-highlighted]]:bg-accent-soft [&_.line[data-highlighted]]:shadow-[inset_2px_0_0_var(--cui-accent)]',
    ],
    lineNumbers: [
      '[&_.line]:before:me-5 [&_.line]:before:inline-block [&_.line]:before:w-[2ch] [&_.line]:before:text-end',
      '[&_.line]:before:text-muted/60 [&_.line]:before:[counter-increment:line] [&_.line]:before:content-[counter(line)]',
      '[&_.line[data-highlighted]]:before:text-accent-soft-foreground',
    ],
    copy: 'absolute end-2.5 top-[calc(0.875rem+0.75rem)] z-10 -translate-y-1/2 bg-surface/80 text-muted backdrop-blur-xs hover:text-foreground',
    fold: 'pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center bg-linear-to-b from-transparent to-surface pt-16 pb-3',
    foldOpen: 'flex justify-center border-t border-border py-2',
    foldButton: 'pointer-events-auto bg-surface',
  },
});
