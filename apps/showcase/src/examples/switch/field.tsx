import { Field, Switch } from '@crazy-staff/ui';

export default function SwitchField() {
  return (
    <Field className="w-full max-w-sm" description="Testers get a ping when a build they voted for ships.">
      <Switch label="Notify me about new builds" defaultChecked />
    </Field>
  );
}
