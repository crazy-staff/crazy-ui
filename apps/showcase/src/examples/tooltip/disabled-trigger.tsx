import { Button, Tooltip } from '@crazy-staff/ui';
import { Flame } from 'lucide-react';

export default function TooltipDisabledTrigger() {
  return (
    <Tooltip content="Crashes in the current build — disabled until 0.9.1">
      <span tabIndex={0} className="inline-flex">
        <Button variant="outline" disabled>
          <Flame /> Meteor rain
        </Button>
      </span>
    </Tooltip>
  );
}
