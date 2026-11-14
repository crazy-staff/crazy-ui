import { Chip, ProgressiveBlur, ScrollArea } from '@crazy-staff/ui';

const posts = [
  { title: 'Save presets per character', votes: 128, status: 'Planned' },
  { title: 'Teleport to the last waypoint', votes: 96, status: 'In progress' },
  { title: 'Hotkeys for every toggle', votes: 81, status: 'Planned' },
  { title: 'Show enemy health bars', votes: 64, status: 'Open' },
  { title: 'Freeze the time of day', votes: 57, status: 'Open' },
  { title: 'Unlock all spells at once', votes: 43, status: 'Done' },
  { title: 'Gothic 2 support', votes: 212, status: 'Planned' },
  { title: 'Infinite arrows', votes: 38, status: 'Done' },
];

export default function ProgressiveBlurHeader() {
  return (
    <div className="squircle relative h-80 w-full max-w-md overflow-hidden rounded-card border border-border bg-background">
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-2 p-3 pt-16">
          {posts.map((post) => (
            <div key={post.title} className="squircle flex items-center gap-3 rounded-item border border-border bg-surface px-3 py-2.5">
              <span className="w-8 text-center text-sm font-semibold tabular-nums">{post.votes}</span>
              <span className="flex-1 text-sm">{post.title}</span>
              <Chip size="sm">{post.status}</Chip>
            </div>
          ))}
        </div>
      </ScrollArea>
      <ProgressiveBlur side="top" size={72} strength={10} tint="var(--cui-background)" />
      <div className="absolute inset-x-0 top-0 z-10 flex h-12 items-center px-4">
        <span className="font-heading text-sm font-semibold">Top ideas</span>
      </div>
    </div>
  );
}
