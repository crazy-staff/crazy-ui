import { Button, DropdownMenu } from '@crazy-staff/ui';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

const themes = [
  { value: 'light', label: 'Light', icon: <Sun /> },
  { value: 'dark', label: 'Dark', icon: <Moon /> },
  { value: 'system', label: 'System', icon: <Monitor /> },
];

/** A picker: the title on top with room under it, the picked option tinted with a check at the end. */
export default function DropdownMenuPicked() {
  const [theme, setTheme] = useState('dark');
  const current = themes.find((t) => t.value === theme)!;
  return (
    <DropdownMenu
      title="Theme"
      showTitle
      trigger={
        <Button variant="outline">
          {current.icon} {current.label}
        </Button>
      }
      items={themes.map((t) => ({ label: t.label, icon: t.icon, checked: t.value === theme, onClick: () => setTheme(t.value) }))}
    />
  );
}
