import { Separator } from '@crazy-staff/ui';

export default function SeparatorVertical() {
  return (
    <div className="flex h-12 items-center gap-5 text-sm">
      <div className="flex flex-col">
        <span className="font-medium tabular-nums">128</span>
        <span className="text-xs text-muted">votes</span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col">
        <span className="font-medium tabular-nums">14</span>
        <span className="text-xs text-muted">comments</span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col">
        <span className="font-medium">Planned</span>
        <span className="text-xs text-muted">status</span>
      </div>
    </div>
  );
}
