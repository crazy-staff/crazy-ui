import { Switch } from '@crazy-staff/ui';

const features = [
  { id: 'god', label: 'God mode', description: 'Ignore all damage.', on: true },
  { id: 'mana', label: 'Infinite mana', description: 'Spells cost nothing.', on: false },
  { id: 'esp', label: 'ESP', description: 'Show names and health over NPCs.', on: true },
];

export default function SwitchSettingsList() {
  return (
    <div className="flex w-full max-w-sm flex-col divide-y divide-border">
      {features.map((f) => (
        <Switch key={f.id} label={f.label} description={f.description} defaultChecked={f.on} className="py-3" />
      ))}
    </div>
  );
}
