import { Field } from '@crazy-staff/ui';

export default function FieldDisabled() {
  return (
    <Field className="w-full max-w-sm" label="Game folder" description="Detected from Steam." disabled>
      <Field.Control defaultValue="C:\Steam\steamapps\common\Gothic" />
    </Field>
  );
}
