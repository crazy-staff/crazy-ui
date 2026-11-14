import { Button, DropdownMenu } from '@crazy-staff/ui';
import { Clock, Footprints, MapPin, Shield, Sparkles, Sun } from 'lucide-react';

export default function DropdownMenuGroups() {
  return (
    <DropdownMenu
      trigger={<Button variant="outline">Quick cheats</Button>}
      items={[
        { type: 'label', label: 'Hero' },
        { label: 'God mode', icon: <Shield />, shortcut: 'F1' },
        { label: 'Infinite mana', icon: <Sparkles />, shortcut: 'F2' },
        { label: 'Walk through walls', icon: <Footprints />, shortcut: 'F3' },
        { type: 'separator' },
        { type: 'label', label: 'World' },
        { label: 'Teleport to marker', icon: <MapPin /> },
        { label: 'Skip to morning', icon: <Sun /> },
        { label: 'Stop time', icon: <Clock />, disabled: true },
      ]}
    />
  );
}
