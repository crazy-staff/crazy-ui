import { Menubar } from '@crazy-staff/ui';
import { FolderOpen, RotateCcw, Save } from 'lucide-react';

export default function MenubarDefault() {
  return (
    <Menubar
      menus={[
        {
          label: 'Profile',
          items: [
            { label: 'New profile', shortcut: 'Ctrl N' },
            { label: 'Open…', icon: <FolderOpen />, shortcut: 'Ctrl O' },
            { label: 'Save', icon: <Save />, shortcut: 'Ctrl S' },
            { type: 'separator' },
            { label: 'Reset all cheats', icon: <RotateCcw />, danger: true },
          ],
        },
        {
          label: 'Cheats',
          items: [
            { type: 'label', label: 'Player' },
            { label: 'God mode', shortcut: 'F1' },
            { label: 'Infinite mana', shortcut: 'F2' },
            { type: 'label', label: 'World' },
            { label: 'Teleport to marker', shortcut: 'Ctrl T' },
            { label: 'Meteor shower', disabled: true },
          ],
        },
        { label: 'View', items: [{ label: 'Overlay' }, { label: 'Hotkey list' }] },
        { label: 'Help', items: [{ label: 'Documentation' }, { label: 'Report a bug' }] },
      ]}
    />
  );
}
