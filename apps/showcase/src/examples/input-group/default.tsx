import { InputGroup, Kbd } from '@crazy-staff/ui';
import { Search } from 'lucide-react';

export default function InputGroupDefault() {
  return (
    <InputGroup
      className="max-w-sm"
      aria-label="Search the docs"
      placeholder="Search the docs…"
      start={<Search />}
      end={<Kbd size="sm">Ctrl K</Kbd>}
    />
  );
}
