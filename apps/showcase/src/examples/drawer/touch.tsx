import { Button, Drawer, Input, Switch, ToggleGroup } from '@crazy-staff/ui';

/** `touch` on the content switches its controls to touch size (`TouchProvider`). */
export default function DrawerTouch() {
  return (
    <Drawer.Root>
      <Drawer.Trigger render={<Button variant="outline" />}>Open touch drawer</Drawer.Trigger>
      <Drawer.Content touch>
        <Drawer.Title>Kit</Drawer.Title>
        <Drawer.Body className="flex flex-col gap-4">
          <Input aria-label="Name" defaultValue="Speedrun" />
          <ToggleGroup
            aria-label="Difficulty"
            defaultValue={['normal']}
            items={[
              { value: 'easy', label: 'Easy' },
              { value: 'normal', label: 'Normal' },
              { value: 'hard', label: 'Hard' },
            ]}
          />
          <Switch label="God mode" />
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close render={<Button variant="ghost" />}>Cancel</Drawer.Close>
          <Drawer.Close render={<Button />}>Save</Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
}
