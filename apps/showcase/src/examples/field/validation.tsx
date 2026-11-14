import { Field, NumberField } from '@crazy-staff/ui';

export default function FieldValidation() {
  return (
    <Field.Root
      className="w-full max-w-sm"
      validationMode="onChange"
      validate={(value) => {
        const n = value as number | null;
        return n !== null && Number.isInteger(n) && n >= 1 && n <= 50 ? null : 'Pick a level from 1 to 50.';
      }}
    >
      <Field.Label>Hero level</Field.Label>
      <NumberField defaultValue={12} allowOutOfRange />
      <Field.Description>Applied on the next load.</Field.Description>
      <Field.Error />
    </Field.Root>
  );
}
