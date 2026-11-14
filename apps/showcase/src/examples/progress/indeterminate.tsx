import { Progress } from '@crazy-staff/ui';

export default function ProgressIndeterminate() {
  return <Progress value={null} label="Looking for the game folder…" showValue={false} className="max-w-md" />;
}
