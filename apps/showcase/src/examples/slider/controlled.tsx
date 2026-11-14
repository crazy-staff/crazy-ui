import { Button, Slider } from '@crazy-staff/ui';
import { useState } from 'react';

export default function SliderControlled() {
  const [health, setHealth] = useState(250);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Slider label="Max health" showValue value={health} onValueChange={(v) => setHealth(v as number)} max={1000} step={10} />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setHealth(40)}>
          Start of the game
        </Button>
        <Button size="sm" variant="outline" onClick={() => setHealth(1000)}>
          Max
        </Button>
      </div>
    </div>
  );
}
