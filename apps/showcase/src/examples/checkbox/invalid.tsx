import { Checkbox, Field } from '@crazy-staff/ui';

export default function CheckboxInvalid() {
  return (
    <Field className="max-w-sm" invalid error="You have to accept the rules to post." errorMatch>
      <Checkbox label="I've read the community rules" />
    </Field>
  );
}
