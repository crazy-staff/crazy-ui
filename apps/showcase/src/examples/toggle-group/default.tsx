import { ToggleGroup } from '@crazy-staff/ui';

export default function ToggleGroupDefault() {
  return (
    <ToggleGroup
      aria-label="Roadmap column"
      defaultValue={['planned']}
      items={[
        { value: 'planned', label: 'Planned' },
        { value: 'in-progress', label: 'In progress' },
        { value: 'done', label: 'Done' },
      ]}
    />
  );
}
