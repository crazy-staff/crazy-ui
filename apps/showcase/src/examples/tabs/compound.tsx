import { Chip, Tabs } from '@crazy-staff/ui';

export default function TabsCompound() {
  return (
    <Tabs.Root defaultValue="ideas" className="w-full max-w-lg">
      <Tabs.List>
        <Tabs.Tab value="ideas">
          Ideas <Chip size="sm">24</Chip>
        </Tabs.Tab>
        <Tabs.Tab value="bugs">
          Bugs <Chip size="sm" variant="neutral">3</Chip>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="ideas" className="text-sm text-muted">
        Most voted: “Save teleport markers between sessions”.
      </Tabs.Panel>
      <Tabs.Panel value="bugs" className="text-sm text-muted">
        Polymorph leaves the hero stuck in the wall.
      </Tabs.Panel>
    </Tabs.Root>
  );
}
