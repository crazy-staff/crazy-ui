import { Button, Command, Kbd, KbdGroup } from '@crazy-staff/ui';
import { Clock, MapPin, Settings, Shield, Sparkles, Wand } from 'lucide-react';
import { useEffect, useState } from 'react';

const groups = [
  {
    label: 'Player',
    items: [
      { value: 'god', label: 'God mode', icon: <Shield />, shortcut: 'F1', keywords: ['invincible'] },
      { value: 'mana', label: 'Infinite mana', icon: <Wand />, shortcut: 'F2' },
      { value: 'level', label: 'Level up', icon: <Sparkles />, shortcut: 'F3' },
    ],
  },
  {
    label: 'World',
    items: [
      { value: 'teleport', label: 'Teleport to marker', icon: <MapPin />, shortcut: 'Ctrl+T' },
      { value: 'time', label: 'Freeze time', icon: <Clock />, shortcut: 'Ctrl+F' },
    ],
  },
  {
    label: 'Trainer',
    items: [{ value: 'settings', label: 'Open settings', icon: <Settings />, shortcut: 'Ctrl+,' }],
  },
];

export default function CommandDialogExample() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="outline" className="text-muted">
          Search commands…
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>J</Kbd>
          </KbdGroup>
        </Button>
      }
      groups={groups}
      footer={
        <>
          <span>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> to move
          </span>
          <span>
            <Kbd>Enter</Kbd> to run
          </span>
          <span>
            <Kbd>Esc</Kbd> to close
          </span>
        </>
      }
    />
  );
}
