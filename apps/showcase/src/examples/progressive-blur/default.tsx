import { ProgressiveBlur, ScrollArea } from '@crazy-staff/ui';

const builds = Array.from({ length: 24 }, (_, i) => ({
  version: `0.${24 - i}`,
  notes: ['Teleport fixed', 'New god mode', 'Faster menu', 'Mana regen tweak'][i % 4],
}));

export default function ProgressiveBlurDefault() {
  return (
    <div className="squircle relative h-72 w-full max-w-xs overflow-hidden rounded-card border border-border bg-surface">
      <ScrollArea className="h-full">
        <div className="flex flex-col p-2 pb-16">
          {builds.map((b) => (
            <div key={b.version} className="flex items-center justify-between px-3 py-2 text-sm">
              <span>Build {b.version}</span>
              <span className="text-xs text-muted">{b.notes}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
      <ProgressiveBlur side="bottom" size={80} tint="var(--cui-surface)" />
    </div>
  );
}
