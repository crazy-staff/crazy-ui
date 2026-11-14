import { Kbd, KbdGroup } from '@crazy-staff/ui';

const hotkeys = [
  { feature: 'God mode', keys: ['F1'] },
  { feature: 'Infinite mana', keys: ['F2'] },
  { feature: 'Teleport to marker', keys: ['Ctrl', 'T'] },
  { feature: 'Save position', keys: ['Ctrl', 'Shift', 'S'] },
];

export default function KbdHotkeys() {
  return (
    <ul className="flex w-full max-w-xs flex-col divide-y divide-border text-sm">
      {hotkeys.map((h) => (
        <li key={h.feature} className="flex items-center justify-between py-2">
          {h.feature}
          <KbdGroup>
            {h.keys.map((k) => (
              <Kbd key={k}>{k}</Kbd>
            ))}
          </KbdGroup>
        </li>
      ))}
    </ul>
  );
}
