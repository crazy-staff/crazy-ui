import { Button, Input, Popover } from '@crazy-staff/ui';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

export default function PopoverControlled() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [markers, setMarkers] = useState(['Old Camp gate', 'Swamp camp']);

  function save() {
    if (!name.trim()) return;
    setMarkers((m) => [...m, name.trim()]);
    setName('');
    setOpen(false);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button>
            <MapPin /> Save marker
          </Button>
        }
        title="Name this marker"
      >
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <Input size="sm" autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Free Mine" />
          <Button size="sm" type="submit">
            Save
          </Button>
        </form>
      </Popover>
      <p className="text-sm text-muted">{markers.join(' · ')}</p>
    </div>
  );
}
