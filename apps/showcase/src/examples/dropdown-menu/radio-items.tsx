import { Button, DropdownMenu } from '@crazy-staff/ui';
import { Gauge } from 'lucide-react';
import { useState } from 'react';

const speeds = ['0.5×', '1×', '2×', '4×'];

export default function DropdownMenuRadioItems() {
  const [speed, setSpeed] = useState('1×');
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>
        <Gauge /> Game speed: {speed}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.GroupLabel>Game speed</DropdownMenu.GroupLabel>
          <DropdownMenu.RadioGroup value={speed} onValueChange={setSpeed}>
            {speeds.map((s) => (
              <DropdownMenu.RadioItem key={s} value={s}>
                {s}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
