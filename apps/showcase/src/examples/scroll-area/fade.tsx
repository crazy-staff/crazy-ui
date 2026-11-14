import { ScrollArea } from '@crazy-staff/ui';

const changes = [
  'Teleports to every camp',
  'Fixed: the arena crash',
  'Faster menu on GD3D11',
  'Hotkeys can be changed',
  'Fixed: polymorph back to the hero',
  'Giant hero size slider',
  'Weather: rain, fog, clear',
  'Time of day slider',
  'Infinite stamina',
  'Spawn items by name',
  'Fixed: mana not refilling after runes',
  'Settings saved per save file',
];

export default function ScrollAreaFade() {
  return (
    <div className="squircle h-64 w-full max-w-sm rounded-card border border-border bg-surface">
      <ScrollArea className="h-full" fade>
        <ul className="flex flex-col gap-1 p-4 text-sm">
          {changes.map((c) => (
            <li key={c} className="py-1">
              {c}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
