import { Accordion, Button } from '@crazy-staff/ui';
import { useState } from 'react';

const items = [
  { value: 'download', title: 'Download the build', content: 'Get the zip from the latest GitHub release.' },
  { value: 'copy', title: 'Copy the files', content: 'Unzip it into the Gothic folder, next to Gothic.exe.' },
  { value: 'play', title: 'Start the game', content: 'Press F1 in the game to open the trainer.' },
];

export default function AccordionControlled() {
  const [open, setOpen] = useState<string[]>(['download']);
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setOpen(items.map((i) => i.value))}>
          Expand all
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen([])}>
          Collapse all
        </Button>
      </div>
      <Accordion multiple value={open} onValueChange={(value) => setOpen(value as string[])} items={items} />
    </div>
  );
}
