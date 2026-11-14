import { Button, DropdownMenu } from '@crazy-staff/ui';

const placements = [
  { side: 'bottom', align: 'start' },
  { side: 'bottom', align: 'end' },
  { side: 'top', align: 'center' },
  { side: 'right', align: 'start' },
] as const;

export default function DropdownMenuSideAlign() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {placements.map(({ side, align }) => (
        <DropdownMenu
          key={`${side}-${align}`}
          side={side}
          align={align}
          trigger={
            <Button variant="outline">
              {side} · {align}
            </Button>
          }
          items={[{ label: 'Rename' }, { label: 'Duplicate' }, { label: 'Export' }]}
        />
      ))}
    </div>
  );
}
