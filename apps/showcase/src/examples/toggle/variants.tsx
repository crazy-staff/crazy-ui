import { Toggle } from '@crazy-staff/ui';
import { Eye } from 'lucide-react';

export default function ToggleVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle variant="ghost">
        <Eye />
        Show hidden items
      </Toggle>
      <Toggle variant="outline">
        <Eye />
        Show hidden items
      </Toggle>
    </div>
  );
}
