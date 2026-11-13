import { Alert } from '@crazy-staff/ui';

export default function AlertDefault() {
  return (
    <Alert className="max-w-lg" title="New build available">
      Version 0.9 adds teleports and fixes the arena crash.
    </Alert>
  );
}
