import { Button, Sheet, Switch } from '@crazy-staff/ui';
import { SlidersHorizontal } from 'lucide-react';

const statuses = ['Verified', 'Works badly', 'Crashes', 'New'];

export default function SheetDefault() {
  return (
    <Sheet
      trigger={
        <Button variant="outline">
          <SlidersHorizontal /> Filters
        </Button>
      }
      title="Filters"
      description="Choose which features the list shows."
      footer={<Sheet.Close render={<Button />}>Apply</Sheet.Close>}
    >
      <div className="flex flex-col gap-4">
        {statuses.map((label) => (
          <label key={label} className="flex items-center justify-between">
            {label}
            <Switch size="sm" defaultChecked={label !== 'Crashes'} />
          </label>
        ))}
      </div>
    </Sheet>
  );
}
