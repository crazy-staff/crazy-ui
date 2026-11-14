import { Field } from '@crazy-staff/ui';

export default function FieldInvalid() {
  return (
    <Field
      className="w-full max-w-sm"
      label="Username"
      invalid
      error="“xardas” is already taken on crazy-hub."
      errorMatch
    >
      <Field.Control defaultValue="xardas" />
    </Field>
  );
}
