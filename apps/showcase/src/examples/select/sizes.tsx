import { Select } from '@crazy-staff/ui';

const items = [
  { value: 'all', label: 'All posts' },
  { value: 'planned', label: 'Planned' },
  { value: 'done', label: 'Done' },
];

export default function SelectSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select size="sm" aria-label="Small" defaultValue="all" items={items} />
      <Select size="md" aria-label="Medium" defaultValue="all" items={items} />
      <Select size="lg" aria-label="Large" defaultValue="all" items={items} />
    </div>
  );
}
