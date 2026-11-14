import { Spinner } from '@crazy-staff/ui';

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}
