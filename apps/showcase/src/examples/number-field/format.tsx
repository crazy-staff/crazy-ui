import { NumberField } from '@crazy-staff/ui';

export default function NumberFieldFormat() {
  return (
    <div className="grid w-full max-w-sm items-end gap-4 sm:grid-cols-2">
      <NumberField label="Drop rate" defaultValue={0.25} min={0} max={1} step={0.05} format={{ style: 'percent' }} />
      <NumberField label="Game speed" defaultValue={1.5} min={0.25} max={4} step={0.25} format={{ minimumFractionDigits: 2 }} />
    </div>
  );
}
