import { NumberField } from '@crazy-staff/ui';

export default function NumberFieldScrub() {
  return (
    <div className="grid w-full max-w-sm items-end gap-4 sm:grid-cols-2">
      <NumberField label="Field of view" scrub defaultValue={90} min={60} max={120} />
      <NumberField aria-label="Run speed" scrub hideButtons defaultValue={100} min={10} max={500} />
    </div>
  );
}
