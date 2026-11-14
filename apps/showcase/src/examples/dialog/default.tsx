import { Button, Dialog, Field, Input } from '@crazy-staff/ui';
import { Pencil } from 'lucide-react';

export default function DialogDefault() {
  return (
    <Dialog
      trigger={
        <Button>
          <Pencil /> Edit kit
        </Button>
      }
      title="Edit kit"
      description="Rename the kit and say what it is for."
      footer={
        <>
          <Dialog.Close render={<Button variant="outline" />}>Cancel</Dialog.Close>
          <Dialog.Close render={<Button />}>Save</Dialog.Close>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Field label="Name">
          <Input defaultValue="Warrior starter" />
        </Field>
        <Field label="Description">
          <Input placeholder="Optional" />
        </Field>
      </div>
    </Dialog>
  );
}
