import { NativeSelect } from '@crazy-staff/ui';

export default function NativeSelectDefault() {
  return (
    <NativeSelect
      aria-label="Game"
      placeholder="Pick a game"
      defaultValue=""
      className="max-w-64"
      options={[
        { value: 'g1', label: 'Gothic 1' },
        { value: 'g2', label: 'Gothic 2: Night of the Raven' },
        { value: 'cm', label: 'Chronicles of Myrtana' },
      ]}
    />
  );
}
