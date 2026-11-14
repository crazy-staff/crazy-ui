import { Field, InputGroup } from '@crazy-staff/ui';
import { AtSign } from 'lucide-react';

export default function InputGroupStates() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup aria-label="Locked" disabled start={<AtSign />} placeholder="Username can't be changed" />
      <Field invalid error="That handle is taken." errorMatch>
        <InputGroup start={<AtSign />} defaultValue="xardas" aria-label="Handle" />
      </Field>
    </div>
  );
}
