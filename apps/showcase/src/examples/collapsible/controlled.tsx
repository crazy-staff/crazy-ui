import { Button, Collapsible } from '@crazy-staff/ui';
import { useState } from 'react';

export default function CollapsibleControlled() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button size="sm" variant="outline" className="self-start" onClick={() => setOpen((o) => !o)}>
        {open ? 'Hide' : 'Show'} the changelog
      </Button>
      <Collapsible title="Changelog 0.9" open={open} onOpenChange={setOpen}>
        <p className="px-2.5 pt-2 text-sm text-muted">Teleports to every camp, a fix for the arena crash, faster menu.</p>
      </Collapsible>
    </div>
  );
}
