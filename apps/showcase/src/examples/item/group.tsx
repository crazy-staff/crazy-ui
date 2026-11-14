import { Chip, ItemGroup, Item, ItemSeparator } from '@crazy-staff/ui';
import { Flame, MapPin, Shield } from 'lucide-react';

const features = [
  { icon: <Shield />, name: 'God mode', note: 'No damage taken.', status: 'verified' },
  { icon: <MapPin />, name: 'Teleport', note: 'Jump to any waypoint.', status: 'new' },
  { icon: <Flame />, name: 'Meteors', note: 'Rain fire on the Old Camp.', status: 'crashes' },
] as const;

const chip = { verified: 'success', new: 'soft', crashes: 'danger' } as const;

export default function ItemGroupExample() {
  return (
    <ItemGroup framed className="max-w-md">
      {features.map((f, i) => (
        <div key={f.name} role="listitem">
          {i > 0 && <ItemSeparator />}
          <Item icon={f.icon} title={f.name} description={f.note} actions={<Chip variant={chip[f.status]}>{f.status}</Chip>} />
        </div>
      ))}
    </ItemGroup>
  );
}
