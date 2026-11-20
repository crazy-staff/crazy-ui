import { ChoiceField } from '@crazy-staff/ui';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export default function ChoiceFieldDefault() {
  const [theme, setTheme] = useState('system');
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
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
    </div>
  );
}
