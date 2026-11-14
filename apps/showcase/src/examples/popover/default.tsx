import { Button, Popover } from '@crazy-staff/ui';
import { Info } from 'lucide-react';

export default function PopoverDefault() {
  return (
    <Popover
      trigger={
        <Button variant="outline">
          <Info /> About this build
        </Button>
      }
      title="Build 0.9"
      description="Teleports, item kits and a fix for the arena crash. Tested on Gothic 1 (Steam)."
    />
  );
}
