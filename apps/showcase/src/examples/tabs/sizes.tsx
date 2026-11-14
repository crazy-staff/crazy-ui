import { Tabs } from '@crazy-staff/ui';

const items = [
  { value: 'all', label: 'All', content: null },
  { value: 'open', label: 'Open', content: null },
  { value: 'planned', label: 'Planned', content: null },
  { value: 'done', label: 'Done', content: null },
];

export default function TabsSizes() {
  return (
    <div className="flex flex-col items-start gap-6">
      <Tabs size="sm" items={items} />
      <Tabs size="md" items={items} />
      <Tabs size="sm" variant="line" items={items} />
      <Tabs size="md" variant="line" items={items} />
    </div>
  );
}
