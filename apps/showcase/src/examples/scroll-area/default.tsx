import { ScrollArea } from '@crazy-staff/ui';

const builds = Array.from({ length: 30 }, (_, i) => ({
  version: `0.${30 - i}`,
  date: i === 0 ? 'this week' : `${i * 2} weeks ago`,
}));

export default function ScrollAreaDefault() {
  return (
    <div className="squircle h-72 w-full max-w-xs rounded-card border border-border bg-surface">
      <ScrollArea className="h-full">
        <div className="flex flex-col p-2">
          <span className="px-3 pt-2 pb-1 text-xs font-medium text-muted">Releases</span>
          {builds.map((b) => (
            <div key={b.version} className="flex items-center justify-between px-3 py-2 text-sm">
              <span>Build {b.version}</span>
              <span className="text-xs text-muted tabular-nums">{b.date}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
