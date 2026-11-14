import { Separator } from '@crazy-staff/ui';

const builds = [
  { version: '0.9', note: 'Teleports, arena crash fixed' },
  { version: '0.8', note: 'Polymorph, giant hero' },
  { version: '0.7', note: 'First public build' },
];

export default function SeparatorList() {
  return (
    <div className="squircle w-full max-w-sm rounded-card border border-border bg-surface">
      {builds.map((b, i) => (
        <div key={b.version}>
          {i > 0 && <Separator />}
          <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
            <span className="font-medium">Build {b.version}</span>
            <span className="text-muted">{b.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
