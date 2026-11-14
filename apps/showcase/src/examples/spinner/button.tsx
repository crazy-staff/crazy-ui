import { Button, Spinner } from '@crazy-staff/ui';

export default function SpinnerButton() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Spinner size="sm" tone="current" label="Saving" /> Saving…
      </Button>
      <Button variant="outline" disabled>
        <Spinner size="sm" tone="muted" label="Checking" /> Checking for updates
      </Button>
    </div>
  );
}
