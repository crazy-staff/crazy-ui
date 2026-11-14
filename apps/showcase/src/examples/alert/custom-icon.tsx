import { Alert } from '@crazy-staff/ui';
import { Sparkles } from 'lucide-react';

export default function AlertCustomIcon() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Alert icon={<Sparkles />} title="New in this build">Meteors now leave craters.</Alert>
      <Alert icon={false} variant="neutral" title="No icon">Pass icon={'{false}'} to hide it.</Alert>
    </div>
  );
}
