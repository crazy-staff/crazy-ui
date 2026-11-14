import { Field } from '@crazy-staff/ui';

export default function FieldCompound() {
  return (
    <Field.Root className="w-full max-w-sm">
      <Field.Label>Discord handle</Field.Label>
      <Field.Control placeholder="@xardas" />
      <Field.Description>We ping testers here when a build is ready.</Field.Description>
    </Field.Root>
  );
}
