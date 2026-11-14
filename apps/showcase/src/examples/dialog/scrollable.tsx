import { Button, Dialog } from '@crazy-staff/ui';

const changes = [
  'Teleport to any saved marker',
  'Item kits: spawn a whole set in one click',
  'Free camera with adjustable speed',
  'Time of day slider',
  'God mode now also blocks fall damage',
  'Infinite mana works with scrolls',
  'Fixed: arena fights crashed with God mode on',
  'Fixed: menu stayed open after loading a save',
  'Fixed: wrong language after alt-tab',
  'Menu remembers the last open tab',
  'Hotkeys can be rebound in settings',
  'New icons in the feature list',
];

export default function DialogScrollable() {
  return (
    <Dialog
      size="lg"
      trigger={<Button variant="outline">What's new in 0.9</Button>}
      title="What's new in 0.9"
      description="Released 2026-11-10 · Gothic 1 (Steam)"
      footer={<Dialog.Close render={<Button />}>Close</Dialog.Close>}
    >
      <ul className="flex flex-col gap-3">
        {changes.map((c) => (
          <li key={c} className="squircle rounded-item bg-surface-2 px-4 py-3">
            {c}
          </li>
        ))}
      </ul>
    </Dialog>
  );
}
