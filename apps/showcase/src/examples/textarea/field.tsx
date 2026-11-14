import { Field, Textarea } from '@crazy-staff/ui';

export default function TextareaField() {
  return (
    <Field
      className="w-full max-w-md"
      label="Steps to reproduce"
      required
      description="One step per line."
      validationMode="onBlur"
      error="Tell us how to make it happen."
      errorMatch="valueMissing"
    >
      <Field.Control required render={<Textarea placeholder={'1. Load a save in the Old Camp\n2. Cast Meteor'} />} />
    </Field>
  );
}
