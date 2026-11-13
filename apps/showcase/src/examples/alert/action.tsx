import { Alert, Button } from '@crazy-staff/ui';

export default function AlertAction() {
  return (
    <Alert className="max-w-lg" title="Dark mode is now available">
      <div className="flex items-end justify-between gap-4">
        <span>Turn it on in the trainer settings.</span>
        <Button size="sm" variant="soft">
          Enable
        </Button>
      </div>
    </Alert>
  );
}
