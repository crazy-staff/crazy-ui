import { Button, Dialog, Field, Input, Textarea } from '@crazy-staff/ui';
import { Lightbulb } from 'lucide-react';
import { type FormEvent, useState } from 'react';

export default function DialogForm() {
  const [open, setOpen] = useState(false);
  const [posted, setPosted] = useState<string | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPosted(String(data.get('title')));
    setOpen(false);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          render={
            <Button>
              <Lightbulb /> Post an idea
            </Button>
          }
        />
        <Dialog.Content>
          <form onSubmit={submit}>
            <Dialog.Header>
              <Dialog.Title>Post an idea</Dialog.Title>
              <Dialog.Description>Other testers can vote on it. Keep the title short.</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body className="flex flex-col gap-4">
              <Field label="Title">
                <Input name="title" required placeholder="e.g. Save teleport markers per save file" />
              </Field>
              <Field label="Details">
                <Textarea name="details" rows={4} placeholder="What should change, and why?" />
              </Field>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close render={<Button variant="outline" />}>Cancel</Dialog.Close>
              <Button type="submit">Post idea</Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Root>
      {posted && <p className="text-sm text-muted">Posted: “{posted}”</p>}
    </div>
  );
}
