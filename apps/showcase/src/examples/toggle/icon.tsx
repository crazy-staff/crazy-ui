import { Toggle } from '@crazy-staff/ui';
import { Bold, Italic, Underline } from 'lucide-react';

export default function ToggleIcon() {
  return (
    <div className="flex items-center gap-1">
      <Toggle size="icon" aria-label="Bold" defaultPressed>
        <Bold />
      </Toggle>
      <Toggle size="icon" aria-label="Italic">
        <Italic />
      </Toggle>
      <Toggle size="icon" aria-label="Underline">
        <Underline />
      </Toggle>
    </div>
  );
}
