import { Toggle } from '@crazy-staff/ui';
import { Pin } from 'lucide-react';

export default function ToggleDefault() {
  return (
    <Toggle defaultPressed>
      <Pin />
      Pin to roadmap
    </Toggle>
  );
}
