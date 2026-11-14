import { Button, Field, Input, Select, Sheet, Switch } from '@crazy-staff/ui';
import { Settings } from 'lucide-react';
import { type FormEvent, useState } from 'react';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'pl', label: 'Polski' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ru', label: 'Русский' },
];

export default function SheetSettingsForm() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSaved(true);
    setOpen(false);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Sheet.Root open={open} onOpenChange={setOpen}>
        <Sheet.Trigger
          render={
            <Button>
              <Settings /> Trainer settings
            </Button>
          }
        />
        <Sheet.Content>
          <form onSubmit={submit} className="flex flex-1 flex-col">
            <Sheet.Header>
              <Sheet.Title>Trainer settings</Sheet.Title>
              <Sheet.Description>Saved in the game folder, per Windows user.</Sheet.Description>
            </Sheet.Header>
            <Sheet.Body className="flex flex-col gap-5">
              <Field label="Menu hotkey">
                <Input defaultValue="F5" />
              </Field>
              <Field label="Language">
                <Select items={languages} defaultValue="en" />
              </Field>
              <label className="flex items-center justify-between">
                Pause the game while the menu is open
                <Switch defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                Show notifications in game
                <Switch />
              </label>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close render={<Button variant="outline" />}>Cancel</Sheet.Close>
              <Button type="submit">Save settings</Button>
            </Sheet.Footer>
          </form>
        </Sheet.Content>
      </Sheet.Root>
      {saved && <p className="text-sm text-muted">Settings saved.</p>}
    </div>
  );
}
