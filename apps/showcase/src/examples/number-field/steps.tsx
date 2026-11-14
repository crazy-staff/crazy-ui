import { NumberField } from '@crazy-staff/ui';

export default function NumberFieldSteps() {
  return (
    <div className="grid w-full max-w-sm items-end gap-4 sm:grid-cols-2">
      <NumberField label="Gold" defaultValue={500} min={0} max={100000} step={100} largeStep={1000} />
      <NumberField label="Hero level" defaultValue={12} min={1} max={50} />
    </div>
  );
}
