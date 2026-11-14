import { Field } from '@crazy-staff/ui';

export default function InputInvalid() {
  return (
    <Field className="w-full max-w-sm" label="Hero level" invalid error="The hero can't go above level 50." errorMatch>
      <Field.Control type="number" defaultValue={72} />
    </Field>
  );
}
