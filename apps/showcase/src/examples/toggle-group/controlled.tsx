import { ToggleGroup } from '@crazy-staff/ui';
import { useState } from 'react';

export default function ToggleGroupControlled() {
  const [value, setValue] = useState(['top']);
  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup
        aria-label="Sort ideas"
        value={value}
        onValueChange={(next) => next.length > 0 && setValue(next)}
        items={[
          { value: 'top', label: 'Top' },
          { value: 'new', label: 'New' },
          { value: 'trending', label: 'Trending' },
        ]}
      />
      <p className="text-xs text-muted">Showing {value[0]} ideas</p>
    </div>
  );
}
