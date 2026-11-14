import { RadioGroup } from '@crazy-staff/ui';

export default function RadioGroupDescription() {
  return (
    <RadioGroup
      aria-label="Release channel"
      defaultValue="stable"
      className="max-w-sm"
      items={[
        { value: 'stable', label: 'Stable', description: 'Only features marked as verified.' },
        { value: 'beta', label: 'Beta', description: 'New features a week early.' },
        { value: 'nightly', label: 'Nightly', description: 'Every build. Expect crashes.' },
      ]}
    />
  );
}
