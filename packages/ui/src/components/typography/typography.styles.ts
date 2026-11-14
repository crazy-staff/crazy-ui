import { tv } from '../../lib/tv';

const heading = 'font-heading font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)] text-foreground text-balance scroll-mt-24';

/** One look per text element, shared by the parts and by the `Prose` wrapper. */
export const typographyStyles = tv({
  slots: {
    h1: `${heading} text-4xl leading-tight`,
    h2: `${heading} text-2xl leading-snug`,
    h3: `${heading} text-xl leading-snug`,
    h4: `${heading} text-base leading-snug`,
    p: 'leading-7 text-foreground/90 text-pretty',
    lead: 'text-lg leading-8 text-muted text-pretty',
    large: 'text-lg font-semibold text-foreground',
    small: 'text-sm font-medium leading-none',
    muted: 'text-sm text-muted',
    blockquote: 'border-s-2 border-accent ps-5 text-foreground/80 italic',
    list: 'ms-5 list-disc space-y-2 marker:text-muted [ol&]:list-decimal [&>li]:ps-1 [&>li]:leading-7',
    inlineCode: 'squircle rounded-chip border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground',
    link: 'font-medium text-accent-soft-foreground underline decoration-accent-soft-foreground/40 underline-offset-4 transition-colors duration-[var(--cui-duration-fast)] ease-ui hover:decoration-accent-soft-foreground',
    kbd: 'squircle rounded-chip border border-border-strong bg-surface px-1.5 py-0.5 font-mono text-[0.8em]',
    hr: 'border-0 border-t border-border',
  },
});

/**
 * Long-form text from markdown or a CMS: every child element gets the same look as the parts.
 * Spacing follows a vertical rhythm: block elements are separated by `margin-top`, headings get more.
 */
export const proseStyles = tv({
  base: [
    'max-w-[68ch] text-base text-foreground',
    '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
    // headings
    '[&_h1]:mt-10 [&_h1]:mb-4 [&_:is(h1,h2,h3,h4)]:font-heading',
    '[&_h1]:text-4xl [&_h1]:leading-tight [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:leading-snug',
    '[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:leading-snug [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-base',
    '[&_:is(h1,h2,h3,h4)]:font-[weight:var(--cui-heading-weight)] [&_:is(h1,h2,h3,h4)]:tracking-[var(--cui-heading-tracking)]',
    '[&_:is(h1,h2,h3,h4)]:text-balance [&_:is(h1,h2,h3,h4)]:text-foreground [&_:is(h1,h2,h3,h4)]:scroll-mt-24',
    // text
    '[&_p]:my-5 [&_p]:leading-7 [&_p]:text-pretty',
    '[&_:is(strong,b)]:font-semibold [&_:is(strong,b)]:text-foreground',
    // links
    '[&_a]:font-medium [&_a]:text-accent-soft-foreground [&_a]:underline [&_a]:decoration-accent-soft-foreground/40 [&_a]:underline-offset-4',
    '[&_a:hover]:decoration-accent-soft-foreground',
    // lists
    '[&_:is(ul,ol)]:my-5 [&_:is(ul,ol)]:ms-5 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:my-2 [&_li]:ps-1 [&_li]:leading-7',
    '[&_li]:marker:text-muted [&_li>:is(ul,ol)]:my-2',
    // quotes
    '[&_blockquote]:my-6 [&_blockquote]:border-s-2 [&_blockquote]:border-accent [&_blockquote]:ps-5 [&_blockquote]:text-foreground/80 [&_blockquote]:italic',
    // code
    '[&_:not(pre)>code]:squircle [&_:not(pre)>code]:rounded-chip [&_:not(pre)>code]:border [&_:not(pre)>code]:border-border',
    '[&_:not(pre)>code]:bg-surface-2 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.85em]',
    '[&_pre]:squircle [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-card [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface [&_pre]:p-4',
    '[&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-6',
    '[&_kbd]:squircle [&_kbd]:rounded-chip [&_kbd]:border [&_kbd]:border-border-strong [&_kbd]:bg-surface [&_kbd]:px-1.5 [&_kbd]:font-mono [&_kbd]:text-[0.8em]',
    // tables
    '[&_table]:my-6 [&_table]:w-full [&_table]:border-separate [&_table]:border-spacing-0 [&_table]:overflow-hidden [&_table]:text-sm',
    '[&_table]:squircle [&_table]:rounded-card [&_table]:border [&_table]:border-border',
    '[&_th]:bg-surface-2/70 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-start [&_th]:text-xs [&_th]:font-medium [&_th]:text-muted',
    '[&_td]:border-t [&_td]:border-border [&_td]:px-4 [&_td]:py-2.5',
    // media and rules
    '[&_img]:squircle [&_img]:my-6 [&_img]:rounded-card',
    '[&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-border',
  ],
  variants: {
    size: {
      sm: 'text-sm [&_p]:my-4 [&_p]:leading-6 [&_li]:leading-6',
      md: '',
      lg: 'text-lg [&_p]:leading-8 [&_li]:leading-8',
    },
  },
  defaultVariants: { size: 'md' },
});
