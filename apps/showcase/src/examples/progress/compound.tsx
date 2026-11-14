import { Progress } from '@crazy-staff/ui';

export default function ProgressCompound() {
  return (
    <Progress.Root value={128} max={200} className="max-w-md">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <Progress.Label>Votes to reach the roadmap</Progress.Label>
        <span className="text-muted tabular-nums">128 / 200</span>
      </div>
      <Progress.Track size="lg" />
    </Progress.Root>
  );
}
