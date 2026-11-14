import { RadioGroup } from '@crazy-staff/ui';

export default function RadioGroupHorizontal() {
  return (
    <RadioGroup
      aria-label="Sort posts by"
      defaultValue="votes"
      className="flex-row flex-wrap gap-x-6"
      items={[
        { value: 'votes', label: 'Most votes' },
        { value: 'new', label: 'Newest' },
        { value: 'comments', label: 'Most discussed' },
      ]}
    />
  );
}
