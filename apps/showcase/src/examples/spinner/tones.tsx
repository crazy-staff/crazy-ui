import { Spinner } from '@crazy-staff/ui';

export default function SpinnerTones() {
  return (
    <div className="flex items-center gap-6">
      <Spinner tone="accent" />
      <Spinner tone="muted" />
      <span className="text-success">
        <Spinner tone="current" />
      </span>
    </div>
  );
}
