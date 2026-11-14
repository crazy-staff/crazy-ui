import { AlertDialog, Button, Spinner } from '@crazy-staff/ui';
import { Ban } from 'lucide-react';
import { useState } from 'react';

export default function AlertDialogAsyncAction() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [banned, setBanned] = useState(false);

  async function ban() {
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setBusy(false);
    setBanned(true);
    setOpen(false);
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={(next) => !busy && setOpen(next)}>
      <AlertDialog.Trigger render={<Button variant="outline" disabled={banned} />}>
        <Ban /> {banned ? 'spammer_42 is banned' : 'Ban spammer_42'}
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Ban spammer_42?</AlertDialog.Title>
          <AlertDialog.Description>
            Their 9 posts are hidden and they can't sign in to crazy-hub any more. You can lift the ban later.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Close render={<Button variant="outline" disabled={busy} />}>Cancel</AlertDialog.Close>
          <Button variant="danger" onClick={ban} disabled={busy} aria-busy={busy}>
            {busy && <Spinner />}
            {busy ? 'Banning…' : 'Ban user'}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
