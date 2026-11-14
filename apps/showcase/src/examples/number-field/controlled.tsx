import { NumberField } from '@crazy-staff/ui';
import { useState } from 'react';

export default function NumberFieldControlled() {
  const [mana, setMana] = useState<number | null>(80);
  return (
    <div className="flex w-full max-w-44 flex-col gap-2">
      <NumberField label="Mana" value={mana} onValueChange={setMana} min={0} max={200} step={10} />
      <p className="text-sm text-muted">Mana: {mana ?? 'empty'} / 200</p>
    </div>
  );
}
