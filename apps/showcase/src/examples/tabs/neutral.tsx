import { Tabs } from '@crazy-staff/ui';

const items = [
  { value: 'new', label: 'Newest', content: null },
  { value: 'top', label: 'Top voted', content: null },
  { value: 'trending', label: 'Trending', content: null },
];

export default function TabsNeutral() {
  return (
    <div className="flex flex-col items-start gap-6">
      <Tabs accent={false} items={items} />
      <Tabs accent={false} variant="line" items={items} />
    </div>
  );
}
