import { Checkbox } from '@crazy-staff/ui';

export default function CheckboxDisabled() {
  return (
    <div className="flex flex-col gap-2.5">
      <Checkbox disabled label="Polymorph (crashes in this build)" />
      <Checkbox disabled defaultChecked label="Safe mode (always on)" />
    </div>
  );
}
