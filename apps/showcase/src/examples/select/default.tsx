import { Select } from '@crazy-staff/ui';

export default function SelectDefault() {
  return (
    <Select
      aria-label="Game"
      placeholder="Pick a game"
      items={[
        { value: 'g1', label: 'Gothic 1' },
        { value: 'g2', label: 'Gothic 2' },
        { value: 'com', label: 'Chronicles of Myrtana' },
      ]}
    />
  );
}
