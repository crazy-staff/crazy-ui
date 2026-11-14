import { Combobox } from '@crazy-staff/ui';

const features = ['God mode', 'Infinite mana', 'Infinite health', 'Teleport', 'Freeze time', 'Fly mode', 'Give item', 'Max level'];

export default function ComboboxDefault() {
  return <Combobox items={features} placeholder="Find a feature…" aria-label="Feature" className="w-72" />;
}
