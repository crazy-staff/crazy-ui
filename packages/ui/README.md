# @crazy-staff/ui

The design system of [crazy-staff](https://github.com/crazy-staff): 60 React components on
[Base UI](https://base-ui.com), styled with Tailwind CSS 4 and tailwind-variants, animated with motion, themed
entirely through CSS variables — our own twist on Fumadocs.

## Install

```sh
bun add @crazy-staff/ui
```

React 19 and Tailwind CSS 4 are peer dependencies.

## Set up

```css
@import 'tailwindcss';
@import '@crazy-staff/ui/theme.css';
@source '../node_modules/@crazy-staff/ui/dist';
```

```ts
import { registerSquircles } from '@crazy-staff/ui';

registerSquircles(); // once on the client: squircle corners in Firefox and Safari
```

The theme uses Inter and Geist Mono (e.g. `@fontsource-variable/inter`, `@fontsource-variable/geist-mono`).
Add the `dark` class to `<html>` for dark mode.

## Use

```tsx
import { Button, Card } from '@crazy-staff/ui';

<Card.Root interactive>
  <Card.Header>
    <Card.Title>Infinite mana</Card.Title>
  </Card.Header>
  <Card.Footer>
    <Button size="sm">Enable</Button>
  </Card.Footer>
</Card.Root>;
```

Every colour, radius, shadow, font, density and duration is a `--cui-*` variable you can override.

Docs and examples: run the showcase from the [repository](https://github.com/crazy-staff/crazy-ui)
(`bun install && bun dev`).

MIT © Dawid Seipold
