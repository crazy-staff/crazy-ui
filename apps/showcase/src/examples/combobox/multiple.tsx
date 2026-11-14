import { Combobox } from '@crazy-staff/ui';
import { useState } from 'react';

const labels = [
  { value: 'bug', label: 'kind: bug' },
  { value: 'feature', label: 'kind: feature' },
  { value: 'docs', label: 'kind: docs' },
  { value: 'g1', label: 'game: gothic-1' },
  { value: 'g2', label: 'game: gothic-2' },
  { value: 'crash', label: 'status: crashes' },
  { value: 'verified', label: 'status: verified' },
];

export default function ComboboxMultiple() {
  const [value, setValue] = useState<string[]>(['bug', 'g1']);
  return (
    <Combobox
      multiple
      items={labels}
      value={value}
      onValueChange={setValue}
      placeholder="Add labels…"
      aria-label="Labels"
      className="w-80"
    />
  );
}
