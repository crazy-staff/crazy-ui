import { Radio, RadioGroup } from '@crazy-staff/ui';

export default function RadioGroupCompound() {
  return (
    <RadioGroup aria-label="Teleport to" defaultValue="old-camp">
      <Radio value="old-camp" label="Old Camp" />
      <Radio value="new-camp" label="New Camp" />
      <Radio value="swamp" label="Swamp Camp" />
    </RadioGroup>
  );
}
