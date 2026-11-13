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
