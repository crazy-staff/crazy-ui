import { NumberField } from '@crazy-staff/ui';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function NumberFieldCompound() {
  return (
    <NumberField.Root className="max-w-44" defaultValue={3} min={1} max={9}>
      <NumberField.Group>
        <NumberField.Input aria-label="Potions per hotkey" className="ps-2.5 text-start" />
        <NumberField.Decrement aria-label="Fewer potions">
          <ChevronDown />
        </NumberField.Decrement>
        <NumberField.Increment aria-label="More potions">
          <ChevronUp />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}
