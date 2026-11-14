import { NumberField } from '@crazy-staff/ui';

export default function NumberFieldSizes() {
  return (
    <div className="flex w-full max-w-44 flex-col gap-3">
      <NumberField size="sm" aria-label="Small" defaultValue={1} />
      <NumberField size="md" aria-label="Medium" defaultValue={10} />
      <NumberField size="lg" aria-label="Large" defaultValue={100} />
    </div>
  );
}
