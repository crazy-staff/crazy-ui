# Writing a docs page

Every component page in `apps/showcase/content/docs/components/<slug>.mdx` follows the same shape, modelled
on shadcn/ui. The reference page is **`alert.mdx`** — copy its structure.

## Shape

1. Frontmatter: `title`, and a `description` that says in one sentence what the component is for (quote it
   if it contains a colon).
2. `<ComponentPreview name="<component>/default" />` — the most typical use, right under the title.
3. `## Installation` — `<InstallTabs component="<folder>" />` (folder = the component's folder in
   `packages/ui/src/components`).
4. `## Usage` — the import, then the smallest useful snippet (two short code fences).
5. `## Examples` — one `###` per example, a sentence or two of explanation, then
   `<ComponentPreview name="<component>/<example>" />`. Never several unrelated demos in one preview.
   Cover: variants, sizes, states (disabled, invalid, loading…), the short form and the compound parts,
   controlled usage, and real cases from our world (Gothic trainer features, crazy-hub posts).
6. `## Accessibility` — keyboard, roles, labels; what Base UI gives and what the user must add.
7. `## API Reference` — one `###` per part (`### Dialog`, `### Dialog.Trigger`, …), a sentence saying what
   it renders, then `<TypeTable type={{ prop: { description, type, default } }} />`. Every prop gets a
   description. Mention which Base UI props pass through.

Every page must have headings (they feed "On this page").

## Examples

- One file per example: `apps/showcase/src/examples/<component>/<example>.tsx`, default export, imports only
  from `@crazy-staff/ui`, `lucide-react`, `react` (and `motion/react` if needed). The file's source is what
  "View code" shows, so keep it short and clean: no docs-only helpers, no comments about the docs.
- Content from our world: trainer features (God mode, Infinite mana, Teleport…), crazy-hub (posts, votes,
  roadmap), testers. No lorem ipsum.
- Previews must look good in light and dark, at 1920 and on a phone (390px).

## Available in MDX without import

All crazy-ui components, plus `ComponentPreview`, `InstallTabs`, `PackageInstall`, `Code`,
`CollapsibleCode`, `TypeTable`, `Steps`/`Step`, `Preview`, `Example`, `PageGlow`, `ComponentGrid`.
