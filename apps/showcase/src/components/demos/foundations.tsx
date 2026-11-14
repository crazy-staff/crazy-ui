import { Button, Card, Chip, Reveal, cn } from '@crazy-staff/ui';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

const swatches = [
  ['frame', 'bg-frame', 'Sidebar and app frame'],
  ['background', 'bg-background', 'Page panel'],
  ['surface', 'bg-surface', 'Cards'],
  ['surface-2', 'bg-surface-2', 'Muted fills'],
  ['hover', 'bg-hover', 'Hover fills'],
  ['border', 'bg-border-strong', 'Lines'],
  ['muted', 'bg-muted', 'Secondary text'],
  ['foreground', 'bg-foreground', 'Text'],
  ['accent', 'bg-accent', 'Primary fill'],
  ['accent-soft', 'bg-accent-soft', 'Tinted fill'],
  ['accent-soft-foreground', 'bg-accent-soft-foreground', 'Accent text'],
  ['danger', 'bg-danger', 'Errors'],
  ['success', 'bg-success', 'Success'],
  ['warning', 'bg-warning', 'Warnings'],
] as const;

export function ColorSwatches() {
  return (
    <div className="not-prose my-6 grid gap-4 lg:grid-cols-2">
      {(['light', 'dark'] as const).map((mode) => (
        <div key={mode} className={cn(mode, 'squircle rounded-card border border-border bg-frame p-5 text-foreground')}>
          <div className="mb-4 font-mono text-[0.6875rem] uppercase tracking-wider text-muted">{mode}</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-2">
            {swatches.map(([name, cls, use]) => (
              <div key={name} className="flex items-center gap-3">
                <span className={cn('squircle size-9 shrink-0 rounded-control-sm border border-border-strong', cls)} />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-mono text-xs">{name}</span>
                  <span className="truncate text-xs text-muted">{use}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const radii = [
  ['chip', 'rounded-chip', 'size-10', '0.5rem'],
  ['control-sm', 'rounded-control-sm', 'size-12', '0.75rem'],
  ['control', 'rounded-control', 'size-14', '1rem'],
  ['control-lg', 'rounded-control-lg', 'size-16', '1.125rem'],
  ['item', 'rounded-item', 'size-14', '0.875rem'],
  ['card', 'rounded-card', 'size-20', '1.5rem'],
  ['panel', 'rounded-panel', 'size-24', '1.75rem'],
] as const;

export function RadiusScale() {
  return (
    <div className="not-prose squircle my-6 flex flex-wrap items-end gap-5 rounded-card border border-border bg-surface p-6">
      {radii.map(([label, r, size, value]) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <span className={cn('squircle border border-border-strong bg-surface-2', r, size)} />
          <span className="font-mono text-[0.6875rem] text-foreground">{label}</span>
          <span className="font-mono text-[0.625rem] text-muted">{value}</span>
        </div>
      ))}
    </div>
  );
}

export function TypeScale() {
  return (
    <div className="not-prose squircle my-6 flex flex-col gap-3 rounded-card border border-border bg-surface p-6">
      <p className="font-heading text-4xl font-semibold tracking-[-0.02em]">Documentation</p>
      <p className="font-heading text-2xl font-semibold tracking-[-0.015em]">Browse by topic</p>
      <p className="font-heading text-lg font-semibold">Getting started</p>
      <p className="text-base">The quick brown fox jumps over the lazy dog — 0123456789.</p>
      <p className="text-sm text-muted">Everything about the project, page by page.</p>
      <code className="font-mono text-sm text-accent-soft-foreground">--cui-font-sans: 'Inter Variable'</code>
    </div>
  );
}

export function MotionDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="not-prose my-6 flex flex-col gap-4">
      <Button variant="outline" size="sm" className="self-start" onClick={() => setKey((k) => k + 1)}>
        <RotateCcw /> Replay
      </Button>
      <Reveal.Group key={key} className="grid gap-3 sm:grid-cols-3">
        {['Getting started', 'Character', 'Inventory'].map((t, i) => (
          <Reveal.Item key={t}>
            <Card.Root interactive className="p-5">
              <Chip size="sm" variant="neutral">
                {i + 3} pages
              </Chip>
              <p className="mt-3 text-sm font-semibold">{t}</p>
              <p className="mt-1 text-sm text-muted">Cards rise in one after another.</p>
            </Card.Root>
          </Reveal.Item>
        ))}
      </Reveal.Group>
    </div>
  );
}
