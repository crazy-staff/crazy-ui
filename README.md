# crazy-ui

The design system of [crazy-staff](https://github.com/crazy-staff): React 19 components on Base UI,
Tailwind CSS 4 and tailwind-variants, with motion, light/dark themes and fully overridable semantic
tokens. Used by crazy-hub and the Crazy Gothic Trainer.

## Monorepo

- `packages/ui` — the library, published to npm as [`@crazy-staff/ui`](packages/ui). Built with tsdown.
- `apps/showcase` — component docs and design rounds, built on Fumadocs + TanStack Start.

## Develop

```sh
bun install
bun dev        # builds the library, then runs the showcase on http://localhost:3000
```

Other scripts (run from the repo root):

```sh
bun run build       # build the library and the showcase
bun run typecheck   # typecheck every workspace
bun run test        # run the library's Vitest suite
bun changeset       # describe a change to @crazy-staff/ui for the changelog
```

## Using the library

```css
@import 'tailwindcss';
@import '@crazy-staff/ui/theme.css';
@source '../node_modules/@crazy-staff/ui/dist';
```

```ts
import { registerSquircles } from '@crazy-staff/ui';
registerSquircles(); // once on the client: squircle corners in Firefox/Safari
```

The theme uses Plus Jakarta Sans and Geist Mono (e.g. `@fontsource-variable/plus-jakarta-sans`,
`@fontsource-variable/geist-mono`); override `--cui-font-sans` / `--cui-font-mono` to use others.

## Status

Design **round 1b** is on the showcase home page: direction B "Soft" on the crazy-hub palette, with
squircle corners, accent gradients and the framed app layout (decision 16). See
[docs/decisions.md](docs/decisions.md) for the roadmap and [docs/guidelines.md](docs/guidelines.md)
for the component rules.
