import { Select } from '@crazy-staff/ui';
import { useState } from 'react';

const sorts = [
  { value: 'votes', label: 'Most votes' },
  { value: 'new', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
];

export default function SelectControlled() {
  const [sort, setSort] = useState<string | null>('votes');
  return (
    <div className="flex flex-col items-center gap-2">
      <Select aria-label="Sort ideas" items={sorts} value={sort} onValueChange={setSort} />
      <p className="text-xs text-muted">Sorting by: {sort}</p>
    </div>
  );
}
