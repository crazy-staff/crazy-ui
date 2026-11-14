import { Switch } from '@crazy-staff/ui';
import { useState } from 'react';

export default function SwitchControlled() {
  const [noclip, setNoclip] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Switch label="Noclip" checked={noclip} onCheckedChange={setNoclip} />
      <p className="text-xs text-muted">{noclip ? 'Walls are optional now.' : 'The hero respects walls.'}</p>
    </div>
  );
}
