import { Field, NumberField } from '@crazy-staff/ui';

export default function NumberFieldInField() {
  return (
    <Field.Root className="w-full max-w-56" validationMode="onChange" validate={(value) => (value === null ? 'Enter a level.' : null)}>
      <Field.Label>Hero level</Field.Label>
      <NumberField defaultValue={12} min={1} max={50} />
      <Field.Description>From 1 to 50, applied on the next load.</Field.Description>
      <Field.Error />
    </Field.Root>
  );
}
