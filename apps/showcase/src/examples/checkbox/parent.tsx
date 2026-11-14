import { Checkbox, CheckboxGroup } from '@crazy-staff/ui';
import { useState } from 'react';

const statuses = [
  { value: 'verified', label: 'Verified' },
  { value: 'works-badly', label: 'Works badly' },
  { value: 'crashes', label: 'Crashes' },
  { value: 'new', label: 'New' },
];

export default function CheckboxParent() {
  const [value, setValue] = useState(['verified', 'new']);
  return (
    <CheckboxGroup
      aria-label="Show features by status"
      value={value}
      onValueChange={setValue}
      allValues={statuses.map((s) => s.value)}
    >
      <Checkbox parent label="All statuses" />
      <div className="flex flex-col gap-2.5 ps-7">
        {statuses.map((s) => (
          <Checkbox key={s.value} value={s.value} label={s.label} />
        ))}
      </div>
    </CheckboxGroup>
  );
}
