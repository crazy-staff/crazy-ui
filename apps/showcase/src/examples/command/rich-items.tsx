import { Command } from '@crazy-staff/ui';
import { Gauge, MapPin, Shield, Wand } from 'lucide-react';

const groups = [
  {
    label: 'Features',
    items: [
      {
        value: 'god',
        label: 'God mode',
        icon: <Shield />,
        breadcrumbs: ['Player', 'Health'],
        description: 'Ignore all damage, falls and drowning.',
        shortcut: 'F1',
      },
      {
        value: 'mana',
        label: 'Infinite mana',
        icon: <Wand />,
        breadcrumbs: ['Player', 'Magic'],
        description: 'Cast any spell without spending mana.',
        shortcut: 'F2',
      },
      {
        value: 'teleport',
        label: 'Teleport to marker',
        icon: <MapPin />,
        breadcrumbs: ['World', 'Movement'],
        description: 'Jump to the marker set on the map.',
        shortcut: 'Ctrl+T',
      },
      {
        value: 'speed',
        label: 'Game speed',
        icon: <Gauge />,
        breadcrumbs: ['World', 'Time'],
        description: 'Slow the world down or speed it up.',
      },
    ],
  },
];

export default function CommandRichItems() {
  return <Command groups={groups} defaultSearch="mana" aria-label="Trainer features" className="max-w-md" />;
}
