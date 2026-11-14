# @crazy-staff/ui

## 0.2.1

### Patch Changes

- a8a3ee2: Sidebar matches the docs sidebar: the gliding hover stays on the rows (no longer jumps onto `Sidebar.Header`), 4px between rows and 24px between groups, the docs' header row (56px) and content padding, and `Sidebar.Trigger` is the docs' collapse button (32px, 16px icon, neutral hover, no press scale; now a plain `<button>`).

## 0.2.0

### Minor Changes

- First public release. The look is settled (our own twist on Fumadocs, crazy-hub palette, superellipse
  corners, opaque borders, WCAG-checked colours), 60 components with docs, effects (Glow, Progressive Blur,
  Reveal) and motion throughout.

## 0.1.2

### Patch Changes

- Round 2: NumberField; Calendar/Date Picker redesign; Command gains search parts (breadcrumbs, highlight,
  jump item, loading, filters); Chart gradients, smooth curves, legend toggles, crosshair tooltip, formats,
  stacking; ProgressiveBlur; new Pagination; sidebar-style hover glide in Tabs and Toggle Group; stable table
  columns; borders on every Button/Toggle variant (no layout shift); gentler press; pointer cursor.

## 0.1.1

### Patch Changes

- Round 1d: docs rewritten like shadcn/ui (live example + View code, Command/Manual install, API tables),
  16 new components (Calendar, Date Picker, Combobox, Command, Input OTP, Native Select, Menubar, Navigation
  Menu, Carousel, Chart, Code Block, Data Table, Resizable, Sidebar, Typography, Item), Tabs and Toggle Group
  in the Toggle look, gliding Pagination, custom Textarea grip, rounder Tooltip, opaque borders.

## 0.1.0

### Minor Changes

- 334040f: Monorepo foundations and the first components from design round 1: `Button`, `Input`, `Switch`, `Card`
  and `Chip`, the `cn`/`tv` helpers, `registerSquircles()` and the semantic token theme
  (`@crazy-staff/ui/theme.css`) in the "Soft" look on the crazy-hub palette.
