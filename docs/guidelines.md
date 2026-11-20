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

## Mobile

Owner's rules (crazy-hub review, round 7, 2026-11-16), for every app built on crazy-ui. A **phone** is
a window below `sm` (640px).

- **Whatever is small and opens becomes a bottom drawer on a phone**: dropdown menus, popovers,
  pickers (language, theme, account), filters, search, a reaction picker, row actions ("…"). Not a
  dropdown that has to be hit with a fingertip. On larger screens they stay the dropdown or popover.
- **Drawer rows are made for a finger**: at least 48px tall (`min-h-12`), `text-base`, 20px icons,
  a gap of 4px between rows. The drawer has a title; no divider straight under it.
- **Picked options** (in drawers and dropdowns alike) are tinted with the soft accent and carry a small
  check at the end. No leading indicator column; a menu's title has room under it.
- **Nothing runs off the screen.** A segmented ToggleGroup that doesn't fit becomes a full-width button
  showing the current choice (icon + label + chevron) that opens the choices in a drawer.
- **Main navigation opens from the bottom right on a phone** (a 56px floating button), where the thumb
  is; the top bar keeps only small icon actions.
- **Management panels** (moderation, quick admin) open from an icon button placed among the page's own
  controls, on every screen: on a wide screen it shows or hides the panel in the right column (pressed
  while open, remembered); on a narrow one it opens the same content in a drawer with touch-size
  controls (`lg` selects and switches, full-size icon buttons, 44px rows). No floating "show panel"
  buttons in random places.
- **Toolbars**: a group of icon buttons stays together when the row wraps; on a phone tighten spacing
  and item padding first so sorting and the icon buttons share one row.
- **Grids** of cards stack to one column when the container is narrower than about 48rem.
- Touch targets in drawers are at least 44px; visible focus and reduced motion still apply.

How the library implements these (issue #7):

- **Adaptive overlays.** `DropdownMenu` and `Popover` take `mobile` (`'drawer'` by default, `'none'` to
  opt out): below `sm` the same compound parts render a bottom `Drawer`. Use `usePhone()` /
  `useDrawerMode()` for your own adaptive components, never a second copy of the content. Context Menu
  and Menubar stay floating (they have no phone use).
- **Every drawer has a title.** Pass `title` to the menu (it also names the desktop popup) or a
  `Popover.Title`; it becomes the drawer's title.
- **Touch size is a context.** Controls read `useTouch()` and grow inside a `TouchProvider`: `sm`/`md`
  become `lg`, icon buttons become `icon-lg` (44px). Library drawers turn it on (`Drawer.Content
  touch`); a new control with sizes must honour it too.
- **Picks close, toggles don't.** Radio items and plain items close the menu (or drawer) when picked;
  checkbox items stay open.
- **Choice Field** collapses to the button on a phone and whenever the segmented toggle doesn't fit its
  container; off a phone the collapsed field opens a menu, not a drawer.
- The sidebar's floating button follows the sidebar's own breakpoint (`md`), so it is there whenever the
  sidebar is a drawer.
- Showcase pages show the phone version in a `PhonePreview` frame (an iframe 390px wide, a real phone
  window); visual snapshots of these run at 390 × 844, light and dark (`apps/showcase/e2e`).
- Open in round "mobile" (`/docs/rounds/mobile`): drawer row style, picked-option tint, floating button
  look. The library ships variant A (crazy-hub round 7) until the owner picks.

Keep this file current: whenever the owner settles a design question in an app review, the rule lands
here (and in the app's own notes) in the same change.
