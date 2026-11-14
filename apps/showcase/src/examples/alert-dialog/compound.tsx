import { AlertDialog, Button, Field, Input } from '@crazy-staff/ui';
import { useState } from 'react';

const KIT = 'Warrior starter';

export default function AlertDialogCompound() {
  const [typed, setTyped] = useState('');
  return (
    <AlertDialog.Root onOpenChange={(open) => !open && setTyped('')}>
      <AlertDialog.Trigger render={<Button variant="outline" />}>Delete kit…</AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete “{KIT}”?</AlertDialog.Title>
          <AlertDialog.Description>
            The kit and its 12 items are removed for good. Type the kit's name to confirm.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <Field label="Kit name" className="mt-4">
          <Input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={KIT} />
        </Field>
        <AlertDialog.Footer>
          <AlertDialog.Close render={<Button variant="outline" />}>Cancel</AlertDialog.Close>
          <AlertDialog.Close render={<Button variant="danger" disabled={typed !== KIT} />}>Delete kit</AlertDialog.Close>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
