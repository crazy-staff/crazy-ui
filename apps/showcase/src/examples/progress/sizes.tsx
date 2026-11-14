import { Progress } from '@crazy-staff/ui';

export default function ProgressSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress value={30} size="sm" aria-label="Small" />
      <Progress value={55} size="md" aria-label="Medium" />
      <Progress value={80} size="lg" aria-label="Large" />
    </div>
  );
}
