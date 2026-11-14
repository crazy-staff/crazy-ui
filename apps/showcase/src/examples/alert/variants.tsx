import { Alert } from '@crazy-staff/ui';

export default function AlertVariants() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Alert title="New build available">Version 0.9 adds teleports.</Alert>
      <Alert variant="success" title="Verified">God mode works on the latest build.</Alert>
      <Alert variant="warning" title="Works badly">Polymorph can leave the hero stuck.</Alert>
      <Alert variant="danger" title="Crashes">Meteors crash the game in the Old Camp.</Alert>
      <Alert variant="neutral" title="Note">Settings are saved per save file.</Alert>
    </div>
  );
}
