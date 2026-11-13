# crazy-ui — instructions for Claude

The design system of the Crazy ecosystem (GitHub org `crazy-staff`): a React component library used by
**crazy-hub** (the web app), the future **crazy-gothic-trainer** desktop/in-game UI and other apps.
All decisions behind it are in `docs/decisions.md`; read it before changing direction.

## People and process

- The owner (Dawid) acts as **project lead**, not as the main coder. He is a frontend developer and may
  push quick style fixes himself; treat them as the intended look, then clean up and generalise them,
  and record the rule they imply in `docs/guidelines.md` so the same mistake never comes back.
- **Talk to him in Polish.** Everything on GitHub (code, commits, issues, PRs, docs) is in **English**.
- **Design work goes in rounds.** Each round shows 2–3 variants side by side (light and dark, with motion)
  on the showcase site / PR preview. Never start the next round before he picks. Never build a whole set
  of components in one look without his choice.
- **His screen:** 3440×1440, 100 % scaling, **Zen browser (Firefox engine)**. Screenshots for review are
  taken with Playwright **Firefox** at 3440×1440, plus 1920×1080, light and dark. The PR preview opened in
  his own browser is the source of truth, screenshots are only a quick look.
- One conversation = one task (a round, a component group, a fix). When a conversation grows long or the
  topic changes, finish with a summary and hand off to a new session (or give him a ready first message).
  Tell him when to start a new conversation and whether it should be Chat (planning) or Code (repo work).
- Local clones live in `F:\Documents\projects\<repo>` on his Windows PC.

## Stack (decided)

- React 19, TypeScript strict, Tailwind CSS 4, **Base UI** (`@base-ui/react`) primitives.
- Styling API: **tailwind-variants** (variants + slots) with tailwind-merge; `cn()` (clsx + tailwind-merge)
  for one-off classes. Every component takes `className` and `classNames={{ slot }}` (HeroUI style).
- Compound parts (`<Select.Root>`, `<Select.Item>` … like Base UI) **and** a simple one-line form
  (`<Select items={…} />`).
- Motion (`motion` package) for enter/exit and layout animation; respect `prefers-reduced-motion`.
- Icons: lucide-react. Forms: TanStack Form + valibot. Tables: TanStack Table. Routing helpers:
  TanStack Router (link components accept router links). Charts: **TanStack Charts** (`@tanstack/charts`,
  pinned exact version, wrapped in our own components). Code highlight: Shiki. Markdown renderer included.
- Monorepo with **bun workspaces**: `packages/ui` (the library, built with tsdown, published to npm as
  `@crazy-staff/ui`), `apps/showcase` (component docs built on Fumadocs, TanStack Start, deployed to
  Cloudflare Pages with a preview per PR). Versions and changelog: Changesets.
- Tests: Vitest (+ Testing Library) for behaviour, axe for accessibility, Playwright visual snapshots of
  every showcase page in light and dark. No Storybook (the showcase replaces it). CI on GitHub Actions
  blocks merges on failures.

## Theming

- One set of **semantic tokens** as CSS variables (background, surface, text, muted, accent, border,
  states, radii, shadows, spacing, motion durations/easings), exposed through Tailwind 4 `@theme`.
- Light and dark from day one.
- Default accent is the **Crazy purple** (brand mark of crazy-staff), taken from the current hub:
  light `hsl(250 80% 54%)`, dark `hsl(250 100% 80%)` with foreground `hsl(250 30% 10%)`.
- Everything is overridable by an app: colours, radii, shadows, fonts, density — not only the accent.

## Conventions

- One component per folder in `packages/ui/src/components/<name>/` with `<name>.tsx`, `<name>.styles.ts`
  (tv definitions), `<name>.test.tsx`, and a showcase page in `apps/showcase`.
- No component without a showcase page and a test.
- Public API documented in the showcase page (props table generated from types).
