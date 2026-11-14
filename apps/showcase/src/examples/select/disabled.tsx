import { Select } from '@crazy-staff/ui';

export default function SelectDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        aria-label="Release channel"
        defaultValue="stable"
        items={[
          { value: 'stable', label: 'Stable' },
          { value: 'beta', label: 'Beta' },
          { value: 'nightly', label: 'Nightly', disabled: true },
        ]}
      />
      <Select aria-label="Language" disabled defaultValue="en" items={[{ value: 'en', label: 'English' }]} />
    </div>
  );
}
