import { Avatar, HoverCard, Switch } from '@crazy-staff/ui';
import { useState } from 'react';

export default function HoverCardControlled() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4 text-sm">
      <HoverCard
        open={open}
        onOpenChange={setOpen}
        trigger={
          <a href="#marta" className="font-medium text-accent-soft-foreground underline decoration-dotted underline-offset-4">
            @marta
          </a>
        }
      >
        <div className="flex items-center gap-3">
          <Avatar name="Marta Nowak" />
          <div>
            <div className="font-semibold">Marta Nowak</div>
            <div className="text-muted">Veteran tester · 48 reports</div>
          </div>
        </div>
      </HoverCard>
      <label className="flex items-center gap-2 text-muted">
        <Switch size="sm" checked={open} onCheckedChange={setOpen} /> Keep the card open
      </label>
    </div>
  );
}
