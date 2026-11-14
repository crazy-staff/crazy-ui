import { Button, Switch, Tooltip } from '@crazy-staff/ui';
import { Info } from 'lucide-react';
import { useState } from 'react';

export default function TooltipControlled() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-6">
      <Tooltip open={open} onOpenChange={setOpen} content="Keeps working after you load a save" side="right">
        <Button size="icon" variant="outline" aria-label="About persistent cheats">
          <Info />
        </Button>
      </Tooltip>
      <label className="flex items-center gap-2 text-sm text-muted">
        <Switch size="sm" checked={open} onCheckedChange={setOpen} />
        Show hint
      </label>
    </div>
  );
}
