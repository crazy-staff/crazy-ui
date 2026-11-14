import { Field, Select } from '@crazy-staff/ui';

export default function SelectField() {
  return (
    <Field
      className="w-full max-w-xs"
      label="Assign to"
      required
      description="They get a notification."
      validationMode="onBlur"
      error="Pick a tester."
      errorMatch="valueMissing"
    >
      <Select
        required
        className="w-full"
        placeholder="Pick a tester"
        items={[
          { value: 'diego', label: 'Diego' },
          { value: 'gorn', label: 'Gorn' },
          { value: 'milten', label: 'Milten' },
        ]}
      />
    </Field>
  );
}
