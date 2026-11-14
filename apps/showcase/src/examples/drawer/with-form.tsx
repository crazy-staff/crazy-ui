import { Button, Drawer, Field, Textarea } from '@crazy-staff/ui';
import { Bug } from 'lucide-react';
import { type FormEvent, useState } from 'react';

export default function DrawerWithForm() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
    setOpen(false);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger
          render={
            <Button>
              <Bug /> Report a bug
            </Button>
          }
        />
        <Drawer.Content>
          <form onSubmit={submit}>
            <Drawer.Title>Report a bug</Drawer.Title>
            <Drawer.Description>Build 0.9 · Gothic 1 (Steam)</Drawer.Description>
            <Drawer.Body>
              <Field label="What happened?">
                <Textarea required rows={4} placeholder="Polymorph into a scavenger, then load a save…" />
              </Field>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.Close render={<Button variant="outline" />}>Cancel</Drawer.Close>
              <Button type="submit">Send report</Button>
            </Drawer.Footer>
          </form>
        </Drawer.Content>
      </Drawer.Root>
      {sent && <p className="text-sm text-muted">Thanks — the report is on its way.</p>}
    </div>
  );
}
