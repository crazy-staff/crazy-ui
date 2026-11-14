import { NumberField } from '@crazy-staff/ui';

export default function NumberFieldStates() {
  return (
    <div className="grid w-full max-w-sm items-end gap-4 sm:grid-cols-2">
      <NumberField label="Strength" defaultValue={100} disabled />
      <NumberField label="Max health" defaultValue={440} readOnly />
    </div>
  );
}
