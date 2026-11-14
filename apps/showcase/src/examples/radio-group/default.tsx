import { RadioGroup } from '@crazy-staff/ui';

export default function RadioGroupDefault() {
  return (
    <RadioGroup
      aria-label="Difficulty"
      defaultValue="normal"
      items={[
        { value: 'easy', label: 'Easy' },
        { value: 'normal', label: 'Normal' },
        { value: 'hard', label: 'Hard' },
      ]}
    />
  );
}
