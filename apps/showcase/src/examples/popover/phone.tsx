import { Button, Popover, Select, Switch } from '@crazy-staff/ui';
import { ListFilter } from 'lucide-react';

/** On a phone the popover's content opens in a drawer, and its controls grow to touch size. */
export default function PopoverPhone() {
  return (
    <Popover
      title="Filters"
      trigger={
        <Button variant="outline" size="icon" aria-label="Filters">
          <ListFilter />
        </Button>
      }
      className="w-80"
    >
      <div className="mt-3 flex flex-col gap-3">
        <Select
          aria-label="Status"
          defaultValue="open"
          items={[
            { value: 'open', label: 'Open' },
            { value: 'planned', label: 'Planned' },
            { value: 'done', label: 'Done' },
          ]}
        />
        <Switch label="Only mine" />
        <Switch label="Hide closed" defaultChecked />
        <div className="flex justify-end gap-2 pt-1">
          <Popover.Close render={<Button variant="ghost" />}>Reset</Popover.Close>
          <Popover.Close render={<Button />}>Apply</Popover.Close>
        </div>
      </div>
    </Popover>
  );
}
