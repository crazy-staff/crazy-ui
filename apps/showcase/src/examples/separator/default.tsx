import { Separator } from '@crazy-staff/ui';

export default function SeparatorDefault() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="text-sm">
        <p className="font-medium">Crazy Gothic Trainer</p>
        <p className="text-muted">An in-game menu with cheats for Gothic 1.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center gap-4 text-sm text-muted">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Roadmap</span>
        <Separator orientation="vertical" />
        <span>Changelog</span>
      </div>
    </div>
  );
}
