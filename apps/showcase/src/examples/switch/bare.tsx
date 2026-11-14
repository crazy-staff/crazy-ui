import { Switch } from '@crazy-staff/ui';

export default function SwitchBare() {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span id="radar-label">Radar</span>
      <Switch aria-labelledby="radar-label" defaultChecked />
    </div>
  );
}
