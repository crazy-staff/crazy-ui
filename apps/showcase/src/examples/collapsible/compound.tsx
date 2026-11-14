import { Chip, Collapsible } from '@crazy-staff/ui';

const testers = ['Diego', 'Milten', 'Gorn', 'Lester', 'Lares'];

export default function CollapsibleCompound() {
  return (
    <Collapsible.Root className="squircle w-full max-w-sm rounded-card border border-border bg-surface p-2">
      <Collapsible.Trigger className="w-full justify-between" chevron={false}>
        Testers on this build
        <Chip size="sm" variant="neutral">
          {testers.length}
        </Chip>
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <ul className="flex flex-col gap-1 px-2.5 pt-2 pb-1 text-sm text-muted">
          {testers.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
