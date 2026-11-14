import { Switch } from '@crazy-staff/ui';

export default function SwitchDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Switch label="Polymorph" description="Disabled until the crash is fixed." disabled />
      <Switch label="Safe mode" description="Always on in this build." disabled defaultChecked />
    </div>
  );
}
