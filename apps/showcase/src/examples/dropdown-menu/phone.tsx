import { Button, DropdownMenu } from '@crazy-staff/ui';
import { Copy, Ellipsis, Flag, Languages, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'pl', label: 'Polski' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ru', label: 'Русский' },
];

/** The same menus as on a desktop: below `sm` they open as a bottom drawer of large rows. */
export default function DropdownMenuPhone() {
  const [lang, setLang] = useState('en');
  return (
    <div className="flex flex-wrap items-center gap-2">
      <DropdownMenu
        title="Language"
        showTitle
        align="end"
        trigger={
          <Button variant="outline" size="icon" aria-label="Language">
            <Languages />
          </Button>
        }
        items={languages.map((l) => ({
          label: l.label,
          lang: l.value,
          checked: l.value === lang,
          onClick: () => setLang(l.value),
        }))}
      />
      <DropdownMenu
        title="Comment"
        trigger={
          <Button variant="outline" size="icon" aria-label="More actions">
            <Ellipsis />
          </Button>
        }
        items={[
          { label: 'Edit', icon: <Pencil /> },
          { label: 'Copy link', icon: <Copy /> },
          { label: 'Report', icon: <Flag /> },
          { type: 'separator' },
          { label: 'Delete', icon: <Trash2 />, danger: true },
        ]}
      />
    </div>
  );
}
