import { Tabs } from '@crazy-staff/ui';

export default function TabsDisabled() {
  return (
    <Tabs
      className="w-full max-w-lg"
      items={[
        { value: 'gothic-1', label: 'Gothic 1', content: <p className="text-sm text-muted">Steam version with GD3D11.</p> },
        { value: 'gothic-2', label: 'Gothic 2', content: null, disabled: true },
        { value: 'chronicles', label: 'Chronicles of Myrtana', content: null, disabled: true },
      ]}
    />
  );
}
