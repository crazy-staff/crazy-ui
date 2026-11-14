import { Chip, Pagination } from '@crazy-staff/ui';
import { useState } from 'react';

const ideas = [
  'Save teleport markers between sessions',
  'Hotkey to toggle god mode',
  'Show NPC names through walls',
  'Spawn any item by name',
  'Slow motion for fights',
  'Free camera for screenshots',
  'Change the weather',
  'Unlock every door in the Old Camp',
  'Learn all skills at once',
  'Show the map of the Valley of Mines',
  'Reset the hero’s attributes',
  'Russian translation of the menu',
];
const perPage = 3;

export default function PaginationResults() {
  const [page, setPage] = useState(1);
  const total = Math.ceil(ideas.length / perPage);
  const shown = ideas.slice((page - 1) * perPage, page * perPage);
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <ul className="squircle flex flex-col divide-y divide-border rounded-card border border-border bg-surface">
        {shown.map((idea, i) => (
          <li key={idea} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
            {idea}
            <Chip size="sm" variant="neutral">
              {120 - (page - 1) * 30 - i * 9} votes
            </Chip>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-muted">
          {ideas.length} ideas · page {page} of {total}
        </span>
        <Pagination page={page} total={total} labels={false} onPageChange={setPage} />
      </div>
    </div>
  );
}
