import { Field, RadioGroup } from '@crazy-staff/ui';

export default function RadioGroupField() {
  return (
    <Field.Root className="gap-3" invalid>
      <span id="rank-label" className="text-sm font-medium">
        Tester rank
      </span>
      <RadioGroup
        aria-labelledby="rank-label"
        items={[
          { value: 'scout', label: 'Scout' },
          { value: 'guard', label: 'Guard' },
          { value: 'magician', label: 'Magician' },
        ]}
      />
      <Field.Error match>Pick a rank before saving.</Field.Error>
    </Field.Root>
  );
}
