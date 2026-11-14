import { Field } from '@crazy-staff/ui';

export default function InputInvalid() {
  return (
    <Field className="w-full max-w-sm" label="Nickname" invalid error="Nicknames can't contain spaces." errorMatch>
      <Field.Control defaultValue="Nameless Hero" />
    </Field>
  );
}
