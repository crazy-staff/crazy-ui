import { Button, Chip, Reveal } from '@crazy-staff/ui';
import { ChevronUp, RotateCcw } from 'lucide-react';
import { useState } from 'react';

const ideas = [
  { title: 'Save teleport markers between sessions', author: 'Diego', votes: 128, status: 'planned' },
  { title: 'Hotkey to toggle god mode', author: 'Milten', votes: 96, status: 'in progress' },
  { title: 'Free camera for screenshots', author: 'Gorn', votes: 71, status: 'released' },
  { title: 'Russian translation of the menu', author: 'Lester', votes: 44, status: 'open' },
  { title: 'Spawn monsters at the cursor', author: 'Lares', votes: 31, status: 'open' },
] as const;

const tone = { planned: 'soft', 'in progress': 'warning', released: 'success', open: 'neutral' } as const;

export default function RevealList() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      <Reveal.Group key={run} stagger={0.08} className="squircle w-full divide-y divide-border overflow-hidden rounded-card border border-border bg-surface">
        {ideas.map((idea) => (
          <Reveal.Item key={idea.title} className="flex items-center gap-3 px-4 py-3">
            <span className="squircle flex w-11 shrink-0 flex-col items-center rounded-control-sm border border-border py-1 text-xs font-medium tabular-nums">
              <ChevronUp className="size-3.5 text-muted" />
              {idea.votes}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{idea.title}</span>
              <span className="block text-xs text-muted">by {idea.author}</span>
            </span>
            <Chip size="sm" variant={tone[idea.status]} className="shrink-0 max-sm:hidden">
              {idea.status}
            </Chip>
          </Reveal.Item>
        ))}
      </Reveal.Group>
      <Button size="sm" variant="ghost" onClick={() => setRun((r) => r + 1)}>
        <RotateCcw /> Replay
      </Button>
    </div>
  );
}
