import { Field } from '@crazy-staff/ui';

export default function FieldRequired() {
  return (
    <Field
      className="w-full max-w-sm"
      label="Post title"
      required
      validationMode="onBlur"
      error="Give your idea a title."
      errorMatch="valueMissing"
    >
      <Field.Control required placeholder="Add a weather switch" />
    </Field>
  );
}
