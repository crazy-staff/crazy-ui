import { ChoiceField, Switch } from '@crazy-staff/ui';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

/** A settings form: segmented toggles on a wide screen, full-width buttons with drawers on a phone. */
export default function ChoiceFieldSettings() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  return (
    <form className="flex w-full max-w-md flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium">Theme</span>
        <ChoiceField
          label="Theme"
          value={theme}
          onValueChange={setTheme}
          choices={[
            { value: 'light', label: 'Light', icon: <Sun /> },
            { value: 'dark', label: 'Dark', icon: <Moon /> },
            { value: 'system', label: 'System', icon: <Monitor /> },
          ]}
        />
      </label>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Language</span>
        <ChoiceField
          label="Language"
          value={lang}
          onValueChange={setLang}
          choices={[
            { value: 'en', label: 'English', lang: 'en' },
            { value: 'pl', label: 'Polski', lang: 'pl' },
            { value: 'de', label: 'Deutsch', lang: 'de' },
            { value: 'ru', label: 'Русский', lang: 'ru' },
          ]}
        />
      </div>
      <Switch label="Email notifications" defaultChecked />
    </form>
  );
}
