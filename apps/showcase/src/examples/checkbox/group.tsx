import { Checkbox, CheckboxGroup } from '@crazy-staff/ui';

export default function CheckboxGroupExample() {
  return (
    <CheckboxGroup aria-labelledby="overlays" defaultValue={['esp', 'radar']}>
      <span id="overlays" className="text-sm font-medium">
        Overlays
      </span>
      <Checkbox name="overlays" value="esp" label="ESP" />
      <Checkbox name="overlays" value="radar" label="Radar" />
      <Checkbox name="overlays" value="markers" label="Map markers" />
    </CheckboxGroup>
  );
}
