import { Button, Card, Input, Switch, cn } from '@crazy-staff/ui';
import { ArrowRight, Check, Star, Trash2 } from 'lucide-react';
import * as React from 'react';
import { type Direction, swatches } from './data';
import { SidebarFragment } from './sidebar';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="font-mono-token text-[0.7rem] font-medium uppercase tracking-widest text-muted">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Palette({ mode }: { mode: 'light' | 'dark' }) {
  return (
    <div
      className={cn(
        mode,
        'flex flex-col gap-2 rounded-item border border-border bg-background p-3',
      )}
    >
      <span className="font-mono-token text-[0.65rem] uppercase tracking-wider text-muted">
        {mode}
      </span>
      <div className="grid grid-cols-4 gap-2">
        {swatches.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1">
            <span
              className={cn(
                'size-9 rounded-item',
                s.token,
                s.ring && 'ring-1 ring-inset ring-border-strong',
              )}
            />
            <span className="text-center text-[0.6rem] leading-tight text-muted">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DirectionColumn({ direction }: { direction: Direction }) {
  const [on, setOn] = React.useState(true);

  return (
    <div
      className={cn(
        direction.scope,
        'flex min-w-0 flex-col gap-6 rounded-card border border-border bg-surface/40 p-5',
      )}
      style={{ fontFamily: 'var(--cui-font-sans)' }}
    >
      {/* heading */}
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-accent font-bold text-accent-foreground shadow-button">
          {direction.letter}
        </span>
        <div className="min-w-0">
          <h2 className="font-heading text-lg font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)] text-foreground">
            {direction.name}
          </h2>
          <p className="text-xs text-muted">{direction.tagline}</p>
        </div>
      </div>
      <p className="-mt-2 text-sm leading-relaxed text-muted">{direction.notes}</p>

      <Section title="Palette — light & dark">
        <div className="grid grid-cols-1 gap-2">
          <Palette mode="light" />
          <Palette mode="dark" />
        </div>
      </Section>

      <Section title="Typography">
        <div className="flex flex-col gap-1.5">
          <p className="font-heading text-2xl font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)] text-foreground">
            Aa Gothic trainer
          </p>
          <p className="text-sm leading-relaxed text-foreground">
            The quick brown fox jumps over the lazy dog — 0123456789.
          </p>
          <code className="font-mono-token text-xs text-accent-soft-foreground">
            const accent = hsl(250 80% 54%)
          </code>
        </div>
      </Section>

      <Section title="Radii & shadows">
        <div className="flex items-end gap-3">
          <div className="flex flex-col items-center gap-1">
            <span className="size-12 rounded-control border border-border bg-surface-2" />
            <span className="text-[0.6rem] text-muted">control</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="size-12 rounded-card border border-border bg-surface-2" />
            <span className="text-[0.6rem] text-muted">card</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="size-12 rounded-card bg-surface shadow-card" />
            <span className="text-[0.6rem] text-muted">shadow</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="size-12 rounded-card bg-surface shadow-popover" />
            <span className="text-[0.6rem] text-muted">popover</span>
          </div>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-2">
          <Button>
            Apply <ArrowRight />
          </Button>
          <Button variant="soft">
            <Star /> Soft
          </Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger" size="icon" aria-label="Delete">
            <Trash2 />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Input & switch">
        <Input placeholder="Search features…" />
        <div className="flex items-center justify-between rounded-item border border-border bg-surface px-3 py-2.5">
          <span className="text-sm text-foreground">God mode</span>
          <Switch checked={on} onCheckedChange={setOn} aria-label="God mode" />
        </div>
      </Section>

      <Section title="Card">
        <Card.Root interactive>
          <Card.Header>
            <Card.Title>Infinite mana</Card.Title>
            <Card.Description>Keeps your mana pool topped up in combat.</Card.Description>
          </Card.Header>
          <Card.Body className="pt-3">
            <span className="inline-flex items-center gap-1.5 rounded-item bg-accent-soft px-2 py-1 text-xs font-medium text-accent-soft-foreground">
              <Check className="size-3" /> verified
            </span>
          </Card.Body>
          <Card.Footer>
            <Button size="sm" className="w-full">
              Enable
            </Button>
          </Card.Footer>
        </Card.Root>
      </Section>

      <Section title="Sidebar — gliding hover">
        <SidebarFragment uid={direction.id} />
      </Section>
    </div>
  );
}
