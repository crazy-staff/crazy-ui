# Decisions

Settled in the planning conversation of 2026-11-13 (owner + Claude). Newest at the bottom. Change a
decision by adding a new entry that supersedes the old one; don't edit history.

## Ecosystem

1. **Names.** Org `crazy-staff`. `crazy-ui` (this library), `crazy-hub` (web app: feedback, roadmap,
   changelog, docs, accounts), `crazy-gothic-trainer` (the game trainer).
2. **Order of work.** crazy-ui first, then crazy-hub, then back to the trainer.
3. **The trainer later** gets rewritten in Rust (Tauri + React for the desktop part, crazy-ui for its UI);
   how to render React UI inside the game is a separate research topic, not part of this repo yet.

## crazy-ui

4. **Primitives: Base UI** (not Radix, not React Aria). Inspiration for look and API from HeroUI and
   shadcn, but our own components and style.
5. **Distribution: npm package** `@crazy-staff/ui` from a bun-workspaces monorepo, plus a showcase site.
   A shadcn-style copy registry may come later.
6. **Showcase = component docs built on Fumadocs**, so it looks close to crazy-hub. Hosted on
   **Cloudflare Pages** (preview per PR). No Storybook.
7. **Theme.** Semantic CSS-variable tokens, light + dark, Crazy purple as the default accent; every token
   (colour, radius, shadow, font, spacing, motion) overridable by apps.
8. **Component API.** tailwind-variants (variants + slots) + `cn`; `className` and `classNames` per slot;
   compound parts and a simple one-line form.
9. **Libraries.** TanStack Router/Form/Table, valibot, motion, lucide, **TanStack Charts** (pinned,
   wrapped), Shiki, a markdown renderer.
10. **Tests.** Vitest + Testing Library, axe, Playwright visual snapshots (light/dark), CI gate.

## Process

11. **Design rounds.** Each round = one page with 2–3 variants (light, dark, motion). The owner picks or
    mixes; the next round waits for the pick. Order: (1) visual direction — palette, type, radii, shadows,
    buttons, input, switch, card, sidebar fragment with hover; (2) buttons and form fields; (3) navigation
    and menus; (4) cards and lists; (5) overlays. After that, components are added as crazy-hub needs them
    while the full library keeps growing in parallel.
12. **Round 1 directions:** A — close to fumadocs.dev; B — closer to HeroUI (softer, rounder);
    C — sharper and "technical" (Linear, Raycast).
13. **Mixed editing.** The owner may fix styles himself in a PR; Claude then cleans up and records the
    rule in `docs/guidelines.md`.
14. **Review setup.** Screenshots with Playwright Firefox at 3440×1440 (owner's screen, Zen browser,
    100 %) and 1920×1080; the PR preview in his browser is the source of truth.
15. **Context.** `CLAUDE.md` per repo, this file for decisions, GitHub issues for task specs, Claude project
    memory for the owner's preferences. One conversation per task; hand off to a new session when done.
