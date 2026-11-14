import { Spinner } from '@crazy-staff/ui';

export default function SpinnerStatus() {
  return (
    <div className="squircle flex items-center gap-3 rounded-card border border-border bg-surface px-4 py-3 text-sm">
      <Spinner size="sm" label="Uploading the test report" />
      <span className="text-muted">Uploading the test report…</span>
    </div>
  );
}
