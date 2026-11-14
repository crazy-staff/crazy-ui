import { Button, Card, Chip, Input, Switch } from '@crazy-staff/ui';
import { ArrowRight, Check, Download, Eye, Plus, Rocket, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Example } from '@/components/docs/preview';

export function ButtonVariants() {
  return (
    <>
      <Button>
        Apply <ArrowRight />
      </Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">
        <Trash2 /> Delete
      </Button>
    </>
  );
}

export function ButtonSizes() {
  return (
    <div className="flex w-full flex-col gap-5">
      <Example label="sizes">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Example>
      <Example label="small row">
        <Button size="sm" variant="soft">
          <Plus /> Add
        </Button>
        <Button size="sm" variant="outline">
          <Download /> Export
        </Button>
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
      </Example>
      <Example label="icon">
        <Button size="icon-sm" variant="soft" aria-label="Add">
          <Plus />
        </Button>
        <Button size="icon" variant="outline" aria-label="Show">
          <Eye />
        </Button>
        <Button size="icon" aria-label="Launch">
          <Rocket />
        </Button>
      </Example>
      <Example label="glow">
        <Button glow>Start the trainer</Button>
        <Button glow size="sm">
          Enable
        </Button>
      </Example>
    </div>
  );
}

export function ChipExamples() {
  return (
    <div className="flex w-full flex-col gap-5">
      <Example label="md">
        <Chip>
          <Check /> verified
        </Chip>
        <Chip variant="solid">new</Chip>
        <Chip variant="outline">beta</Chip>
        <Chip variant="neutral">4 pages</Chip>
      </Example>
      <Example label="sm">
        <Chip size="sm">
          <Check /> verified
        </Chip>
        <Chip size="sm" variant="solid">
          G1
        </Chip>
        <Chip size="sm" variant="outline">
          beta
        </Chip>
        <Chip size="sm" variant="neutral">
          draft
        </Chip>
      </Example>
    </div>
  );
}

export function InputExamples() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input size="sm" placeholder="Filter…" />
      <Input placeholder="Search features…" />
      <Input size="lg" placeholder="Name your kit" />
      <Input placeholder="Disabled" disabled />
    </div>
  );
}

export function SwitchSettings() {
  const [rows, setRows] = useState({ god: true, mana: false, esp: true });
  const items = [
    ['god', 'God mode', 'Ignore all damage.'],
    ['mana', 'Infinite mana', 'Keep the mana pool topped up.'],
    ['esp', 'Show ESP', 'Outline NPCs through walls.'],
  ] as const;
  return (
    <div className="squircle flex w-full max-w-md flex-col rounded-card border border-border bg-background p-2">
      {items.map(([key, title, desc]) => (
        <label
          key={key}
          className="squircle flex cursor-pointer items-center justify-between gap-4 rounded-item px-4 py-3 transition-colors duration-[var(--cui-duration-fast)] hover:bg-hover"
        >
          <span className="flex flex-col">
            <span className="text-sm font-medium">{title}</span>
            <span className="text-xs text-muted">{desc}</span>
          </span>
          <Switch checked={rows[key]} onCheckedChange={(v) => setRows((r) => ({ ...r, [key]: v }))} aria-label={title} />
        </label>
      ))}
    </div>
  );
}

export function CardExamples() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <Card.Root interactive>
        <Card.Header>
          <Card.Title>Infinite mana</Card.Title>
          <Card.Description>Keeps your mana pool topped up in combat.</Card.Description>
        </Card.Header>
        <Card.Body className="pt-3">
          <Chip>
            <Check /> verified
          </Chip>
        </Card.Body>
        <Card.Footer>
          <Button size="sm" className="w-full">
            Enable
          </Button>
        </Card.Footer>
      </Card.Root>
      <div className="squircle relative overflow-hidden rounded-card border border-border bg-surface p-5">
        <div aria-hidden className="glow pointer-events-none absolute inset-0" />
        <div className="relative flex h-full flex-col gap-2">
          <Chip variant="solid" size="sm" className="self-start">
            new
          </Chip>
          <h3 className="text-sm font-semibold">Gradient inside a frame</h3>
          <p className="text-sm text-muted">The `glow` utility fills the whole rounded box.</p>
        </div>
      </div>
    </div>
  );
}
