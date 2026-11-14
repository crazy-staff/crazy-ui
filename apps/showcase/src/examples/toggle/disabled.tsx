import { Toggle } from '@crazy-staff/ui';
import { Wand } from 'lucide-react';

export default function ToggleDisabled() {
  return (
    <Toggle variant="outline" disabled>
      <Wand />
      Polymorph
    </Toggle>
  );
}
