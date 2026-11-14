import { Field } from '@crazy-staff/ui';

export default function FieldDefault() {
  return (
    <Field className="w-full max-w-sm" label="Hero name" description="Shown in the trainer menu and in save names.">
      <Field.Control placeholder="Nameless hero" />
    </Field>
  );
}
