import { ToggleGroup } from '@crazy-staff/ui';

export default function ToggleGroupVertical() {
  return (
    <ToggleGroup
      orientation="vertical"
      aria-label="Trainer tab"
      defaultValue={['player']}
      className="w-40"
      classNames={{ item: 'justify-start' }}
      items={[
        { value: 'player', label: 'Player' },
        { value: 'world', label: 'World' },
        { value: 'teleport', label: 'Teleport' },
        { value: 'items', label: 'Items' },
      ]}
    />
  );
}
