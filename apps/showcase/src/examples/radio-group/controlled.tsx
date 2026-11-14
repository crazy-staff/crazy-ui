import { RadioGroup } from '@crazy-staff/ui';
import { useState } from 'react';

export default function RadioGroupControlled() {
  const [status, setStatus] = useState('planned');
  return (
    <div className="flex flex-col gap-3">
      <RadioGroup
        aria-label="Post status"
        value={status}
        onValueChange={(v) => setStatus(v as string)}
        items={[
          { value: 'planned', label: 'Planned' },
          { value: 'in-progress', label: 'In progress' },
          { value: 'done', label: 'Done' },
        ]}
      />
      <p className="text-xs text-muted">Status: {status}</p>
    </div>
  );
}
