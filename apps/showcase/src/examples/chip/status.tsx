import { Chip } from '@crazy-staff/ui';

const features = [
  { name: 'God mode', status: 'verified', variant: 'success' },
  { name: 'Polymorph', status: 'works badly', variant: 'warning' },
  { name: 'Meteor rain', status: 'crashes', variant: 'danger' },
  { name: 'Teleport to marker', status: 'new', variant: 'soft' },
] as const;

export default function ChipStatus() {
  return (
    <ul className="flex w-full max-w-sm flex-col divide-y divide-border text-sm">
      {features.map((f) => (
        <li key={f.name} className="flex items-center justify-between py-2.5">
          {f.name}
          <Chip variant={f.variant}>{f.status}</Chip>
        </li>
      ))}
    </ul>
  );
}
