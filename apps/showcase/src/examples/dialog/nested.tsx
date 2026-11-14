import { AlertDialog, Button, Dialog, Field, Input } from '@crazy-staff/ui';
import { useState } from 'react';

export default function DialogNested() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saved, setSaved] = useState('Warrior starter');
  const [name, setName] = useState(saved);
  const dirty = name !== saved;

  function requestClose(next: boolean) {
    if (!next && dirty) {
      setConfirmOpen(true);
      return;
    }
    setOpen(next);
  }

  return (
    <Dialog.Root open={open} onOpenChange={requestClose}>
      <Dialog.Trigger render={<Button variant="outline" />}>Rename “{saved}”</Dialog.Trigger>
      <Dialog.Content size="sm">
        <Dialog.Header>
          <Dialog.Title>Rename kit</Dialog.Title>
          <Dialog.Description>Change the name and try to close without saving.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <Field label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="outline" onClick={() => requestClose(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setSaved(name);
              setOpen(false);
            }}
          >
            Save
          </Button>
        </Dialog.Footer>
        <AlertDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Discard your changes?"
          description="The new name hasn't been saved."
          cancelLabel="Keep editing"
          actionLabel="Discard"
          tone="danger"
          onAction={() => {
            setName(saved);
            setOpen(false);
          }}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
}
