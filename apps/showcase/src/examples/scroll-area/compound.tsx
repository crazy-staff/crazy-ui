import { ScrollArea } from '@crazy-staff/ui';

const testers = ['Diego', 'Milten', 'Gorn', 'Lester', 'Lares', 'Cor Angar', 'Saturas', 'Xardas', 'Thorus', 'Fisk', 'Wolf', 'Cavalorn'];

export default function ScrollAreaCompound() {
  return (
    <ScrollArea.Root className="squircle h-56 w-full max-w-xs rounded-card border border-border bg-surface">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <ol className="flex flex-col p-2 text-sm">
            {testers.map((t, i) => (
              <li key={t} className="flex items-center justify-between px-3 py-2">
                {t}
                <span className="text-xs text-muted tabular-nums">{48 - i * 3} reports</span>
              </li>
            ))}
          </ol>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" />
    </ScrollArea.Root>
  );
}
