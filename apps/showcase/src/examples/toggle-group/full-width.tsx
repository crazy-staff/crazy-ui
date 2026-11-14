import { ToggleGroup } from '@crazy-staff/ui';

export default function ToggleGroupFullWidth() {
  return (
    <ToggleGroup
      aria-label="Release channel"
      defaultValue={['beta']}
      className="flex w-full max-w-md"
      classNames={{ item: 'flex-1' }}
      items={[
        { value: 'stable', label: 'Stable' },
        { value: 'beta', label: 'Beta' },
        { value: 'nightly', label: 'Nightly' },
      ]}
    />
  );
}
