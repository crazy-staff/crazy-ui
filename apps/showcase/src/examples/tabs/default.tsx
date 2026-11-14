import { Tabs } from '@crazy-staff/ui';

export default function TabsDefault() {
  return (
    <Tabs
      className="w-full max-w-lg"
      items={[
        {
          value: 'character',
          label: 'Character',
          content: <p className="text-sm text-muted">God mode, infinite mana and stamina, level and attributes.</p>,
        },
        {
          value: 'world',
          label: 'World',
          content: <p className="text-sm text-muted">Time of day, weather and teleports to every camp.</p>,
        },
        {
          value: 'fun',
          label: 'Fun',
          content: <p className="text-sm text-muted">Polymorph, meteors and the giant hero.</p>,
        },
      ]}
    />
  );
}
