import { Card, Chip } from '@crazy-staff/ui';

const features = [
  { title: 'God mode', text: 'No damage from monsters, falls or magic.', status: 'verified', variant: 'success' },
  { title: 'Polymorph', text: 'Turn into any creature you have met.', status: 'works badly', variant: 'warning' },
  { title: 'Meteor rain', text: 'Calls fire from the sky around the hero.', status: 'crashes', variant: 'danger' },
] as const;

export default function CardInteractive() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {features.map((f) => (
        <Card key={f.title} interactive tabIndex={0} title={f.title} description={f.text} footer={<Chip variant={f.variant}>{f.status}</Chip>} />
      ))}
    </div>
  );
}
