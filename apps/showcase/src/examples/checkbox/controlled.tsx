import { Checkbox } from '@crazy-staff/ui';
import { useState } from 'react';

export default function CheckboxControlled() {
  const [pinned, setPinned] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <Checkbox label="Pin this post to the roadmap" checked={pinned} onCheckedChange={setPinned} />
      <p className="text-xs text-muted">{pinned ? 'Pinned at the top of “Planned”.' : 'Not pinned.'}</p>
    </div>
  );
}
