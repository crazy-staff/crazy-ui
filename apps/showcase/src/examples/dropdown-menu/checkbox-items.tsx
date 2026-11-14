import { Button, DropdownMenu } from '@crazy-staff/ui';
import { Eye } from 'lucide-react';
import { useState } from 'react';

export default function DropdownMenuCheckboxItems() {
  const [overlays, setOverlays] = useState({ esp: true, radar: false, compass: true });
  const toggle = (key: keyof typeof overlays) => (checked: boolean) => setOverlays((o) => ({ ...o, [key]: checked }));

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>
        <Eye /> Overlays
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.GroupLabel>Show in game</DropdownMenu.GroupLabel>
          <DropdownMenu.CheckboxItem checked={overlays.esp} onCheckedChange={toggle('esp')}>
            NPC names through walls
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem checked={overlays.radar} onCheckedChange={toggle('radar')}>
            Radar
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem checked={overlays.compass} onCheckedChange={toggle('compass')}>
            Compass
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
