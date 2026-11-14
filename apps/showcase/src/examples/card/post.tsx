import { Avatar, Button, Card, Chip } from '@crazy-staff/ui';
import { ChevronUp, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function CardPost() {
  const [voted, setVoted] = useState(false);
  return (
    <Card.Root className="flex w-full max-w-lg gap-4 p-5">
      <Button
        variant={voted ? 'soft' : 'outline'}
        className="h-auto flex-col gap-0 px-3 py-2"
        aria-pressed={voted}
        onClick={() => setVoted((v) => !v)}
      >
        <ChevronUp />
        <span className="tabular-nums">{voted ? 43 : 42}</span>
      </Button>
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Card.Title>Save teleport markers per save file</Card.Title>
          <Chip size="sm">planned</Chip>
        </div>
        <Card.Description>
          Markers from one playthrough show up in another. Keep them with the save so each run has its own.
        </Card.Description>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted">
          <Avatar size="sm" name="Marta Nowak" />
          Marta Nowak · 2 days ago
          <span className="flex items-center gap-1">
            <MessageSquare className="size-3.5" /> 7
          </span>
        </div>
      </div>
    </Card.Root>
  );
}
