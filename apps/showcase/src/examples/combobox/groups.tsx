import { Combobox } from '@crazy-staff/ui';
import { Clock, Heart, MapPin, Shield, Sparkles, Wand } from 'lucide-react';

const groups = [
  {
    label: 'Player',
    items: [
      { value: 'god', label: 'God mode', icon: <Shield /> },
      { value: 'health', label: 'Infinite health', icon: <Heart /> },
      { value: 'mana', label: 'Infinite mana', icon: <Wand /> },
    ],
  },
  {
    label: 'World',
    items: [
      { value: 'teleport', label: 'Teleport', icon: <MapPin /> },
      { value: 'time', label: 'Freeze time', icon: <Clock /> },
      { value: 'meteors', label: 'Meteor shower', icon: <Sparkles />, disabled: true },
    ],
  },
];

export default function ComboboxGroups() {
  return <Combobox items={groups} placeholder="Pick a hotkey action…" aria-label="Hotkey action" className="w-72" />;
}
