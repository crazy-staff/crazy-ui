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

## Status

Design **round 1** is on the showcase home page: three visual directions (Docs / Soft / Technical),
all built from the same tokens with the Crazy-purple accent. See
[docs/decisions.md](docs/decisions.md) for the roadmap and [docs/guidelines.md](docs/guidelines.md)
for the component rules.
