import { InputGroup } from '@crazy-staff/ui';
import { Search } from 'lucide-react';

export default function InputGroupSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <InputGroup size="sm" aria-label="Small" start={<Search />} placeholder="Filter testers…" />
      <InputGroup size="md" aria-label="Medium" start={<Search />} placeholder="Search features…" />
      <InputGroup size="lg" aria-label="Large" start={<Search />} placeholder="Search the hub…" />
    </div>
  );
}
