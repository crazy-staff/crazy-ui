import { Card, Reveal } from '@crazy-staff/ui';

const builds = [
  '0.9 · Teleports and kits',
  '0.8 · Free camera',
  '0.7 · Spawn menu',
  '0.6 · Time of day',
  '0.5 · God mode',
  '0.4 · First public build',
];

export default function RevealOnScroll() {
  return (
    <div className="squircle h-64 w-full max-w-sm overflow-y-auto rounded-card border border-border p-3">
      <div className="flex flex-col gap-3">
        {builds.map((b) => (
          <Reveal key={b} once={false}>
            <Card className="px-4 py-6 text-sm font-medium">{b}</Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
