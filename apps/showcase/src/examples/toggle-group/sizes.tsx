import { ToggleGroup } from '@crazy-staff/ui';

const items = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

export default function ToggleGroupSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup size="sm" aria-label="Small" defaultValue={['week']} items={items} />
      <ToggleGroup size="md" aria-label="Medium" defaultValue={['week']} items={items} />
      <ToggleGroup size="lg" aria-label="Large" defaultValue={['week']} items={items} />
    </div>
  );
}
