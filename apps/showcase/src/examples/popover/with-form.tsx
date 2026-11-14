import { Button, Field, Input, Popover, Switch } from '@crazy-staff/ui';
import { SlidersHorizontal } from 'lucide-react';

export default function PopoverWithForm() {
  return (
    <Popover.Root>
      <Popover.Trigger
        render={
          <Button variant="outline">
            <SlidersHorizontal /> Filters
          </Button>
        }
      />
      <Popover.Content align="start" className="w-80">
        <Popover.Title>Filter features</Popover.Title>
        <Popover.Description>Narrow down the feature list.</Popover.Description>
        <form className="mt-4 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <Field label="Name">
            <Input size="sm" placeholder="e.g. teleport" />
          </Field>
          <label className="flex items-center justify-between text-sm">
            Only verified
            <Switch size="sm" defaultChecked />
          </label>
          <label className="flex items-center justify-between text-sm">
            Hide features that crash
            <Switch size="sm" defaultChecked />
          </label>
          <div className="flex justify-end gap-2">
            <Popover.Close render={<Button size="sm" variant="ghost" />}>Reset</Popover.Close>
            <Popover.Close render={<Button size="sm" type="submit" />}>Apply</Popover.Close>
          </div>
        </form>
      </Popover.Content>
    </Popover.Root>
  );
}
