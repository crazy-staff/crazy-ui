import { Chip } from '@crazy-staff/ui';
import { CircleCheck, FlaskConical, Sparkles } from 'lucide-react';

export default function ChipWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Chip variant="success">
        <CircleCheck /> verified
      </Chip>
      <Chip>
        <Sparkles /> new
      </Chip>
      <Chip variant="outline">
        <FlaskConical /> beta tester
      </Chip>
    </div>
  );
}
