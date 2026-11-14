import { Switch } from '@crazy-staff/ui';

export default function SwitchSizes() {
  return (
    <div className="flex items-center gap-6">
      <Switch size="sm" aria-label="Small" defaultChecked />
      <Switch size="md" aria-label="Medium" defaultChecked />
      <Switch size="lg" aria-label="Large" defaultChecked />
    </div>
  );
}
