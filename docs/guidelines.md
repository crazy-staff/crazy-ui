# Guidelines

Rules the component code must follow. Each rule exists because of a concrete decision or fix; when the
owner pushes a style change himself, the generalised rule it implies is recorded here so it doesn't
regress (decision 13).

## Tokens

- Components never hardcode a colour, radius, shadow, font or duration. They read a semantic token
  (`bg-accent`, `rounded-control`, `shadow-card`, `h-control`, `ease-ui`, …). A visual change that can't
  be expressed as a token is a missing token — add it to `packages/ui/src/styles/theme.css` first.
- Dark mode is **only** a token swap. Components must not use the `dark:` variant; overriding the `--cui-*`
  values under `.dark` is what changes their appearance. This keeps every component themeable by any app.
- New tokens are added to the `twMergeConfig` theme table in `packages/ui/src/lib/tv.ts`, otherwise
  `cn()` can't resolve conflicts between two classes from the same group.

## Component API

- Every component takes `className` (merged last, so a caller always wins) and, when it has more than one
  element, `classNames={{ slot }}`.
- Styles live in a sibling `<name>.styles.ts` using `tv()` from `../../lib/tv`, never inline `tv` imported
  straight from `tailwind-variants` (ours carries the merge table).
- Prefer Base UI primitives for anything with behaviour (focus, keyboard, ARIA). Don't reimplement it.

## Motion

- Enter/exit and layout animation use the `motion` package and must respect `prefers-reduced-motion`.
  Durations and easings come from tokens (`--cui-duration-*`, `--cui-ease*`), which the reduced-motion
  media query already zeroes out.

## Showcase

- No component without a showcase page and a test (Vitest + Testing Library).

## Squircles

- Corners use the `squircle` utility plus a radius from the scale (`rounded-chip` < `rounded-control-sm`
  < `rounded-control` < `rounded-control-lg`, `rounded-item`, `rounded-card`, `rounded-panel`). The
  smaller the element, the smaller the radius — small controls and chips must never look like pills
  (owner's feedback, round 1).
- Firefox and Safari draw squircles with the `hyperellipse` polyfill (`registerSquircles()`), which
  paints background, border and shadow from a snapshot of the computed style. Therefore:
  - no `box-shadow` on `<input>`/`<textarea>`/`<img>` with `squircle` (the shadow layer lives on
    `::before`, which replaced elements don't have);
  - no inset shadows or `ring-*` on squircle elements for outlines — use `border`;
  - no `box-shadow` on elements with a transparent background (the polyfill paints the shadow as a
    filled shape that shows through);
  - transitions of background/border/shadow are switched off under `[data-squircle-fallback]`.
- Check the fallback in Chromium with `?fallback` on the showcase URL.

## Colour and contrast

- Check contrast **before** changing any colour: every token pair in
  `packages/ui/src/styles/contrast.test.ts` must stay green (text ≥ 4.5:1, body text ≥ 7:1). Add new
  pairs there when you add tokens.
- No neon: status colours are muted; the light theme mirrors the dark one.

## Effects

- The accent glow under buttons is opt-in (`glow` prop), never the default.
- Hover shadows are subtle: low opacity, large blur, negative spread.
- Things that appear (cards, list rows, sections) animate in with `Reveal`; nothing animates without
  respecting reduced motion.

## No layout shift

- Every variant of a control has the same box: variants without a visible outline still get a
  `border border-transparent`, so switching variant (e.g. outline → soft on a vote button) never
  changes the width or height.
- Clickable things show `cursor: pointer` (global rule in theme.css).
- Press feedback is small (`--cui-press-scale` 0.985) with a soft spring, never a jump.
- The gliding hover block belongs to the rows of a menu column only. Headers, titles, triggers and
  pickers next to it keep their own hover and sit in `[data-no-glide-area]`; the block never jumps
  onto them (owner's feedback on crazy-hub, 2026-11-14).
- Shapes that glide or resize (hover blocks, active fills, indicators, thumbs) use `squircle-motion`,
  not `squircle`: the polyfill can't follow an animation, so where `corner-shape` is unsupported they
  get a plain radius scaled to match. Rows that share a column with a gliding block (sidebar rows,
  tabs, toggle-group items — their active fill sits where the hover block goes) use
  `squircle-motion` too, so hover and active always have the same corners.

## Declutter

Owner's rule (crazy-hub ideas review, 2026-11-15), for every app built on crazy-ui:

- **No text where an icon carries the meaning.** Toolbar actions that are universally understood
  (filter, search, edit, delete, close, more, copy, collapse) are icon-only buttons with an
  `aria-label` and a tooltip; a count or state goes in a badge, not in words.
- **Whitespace first.** Groups of choices, form fields, list items and comment threads get room to
  breathe; when a screen feels cluttered, add space and hierarchy before adding borders or dividers.
- **Controls in one row have the same size** (height, and width for icon buttons): a search input,
  a select and a button next to each other share one `size`.
- No decorative outline around a control that is already a clear group (e.g. a segmented
  ToggleGroup used for sorting).
- **Destructive actions are always red** (owner, 2026-11-15): delete, remove, ban, reset, avatar
  removal… use the `danger` tone (red text or icon with a red hover tint for ghost/icon buttons,
  `variant="danger"` for a primary one, `danger` menu items) and confirm with an `AlertDialog`
  `tone="danger"` first. A destructive action never looks like a neutral button.
