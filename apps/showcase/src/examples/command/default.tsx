import { Command } from '@crazy-staff/ui';
import { Clock, MapPin, Settings, Shield, Sparkles, Wand } from 'lucide-react';

const groups = [
  {
    label: 'Player',
    items: [
      { value: 'god', label: 'God mode', icon: <Shield />, shortcut: 'F1', keywords: ['invincible'] },
      { value: 'mana', label: 'Infinite mana', icon: <Wand />, shortcut: 'F2' },
      { value: 'level', label: 'Level up', icon: <Sparkles />, shortcut: 'F3' },
    ],
  },
  {
    label: 'World',
    items: [
      { value: 'teleport', label: 'Teleport to marker', icon: <MapPin />, shortcut: 'Ctrl+T' },
      { value: 'time', label: 'Freeze time', icon: <Clock />, shortcut: 'Ctrl+F' },
    ],
  },
  {
    label: 'Trainer',
    items: [{ value: 'settings', label: 'Open settings', icon: <Settings />, shortcut: 'Ctrl+,' }],
  },
];

export default function CommandDefault() {
  return <Command groups={groups} aria-label="Trainer commands" className="max-w-md" />;
}
