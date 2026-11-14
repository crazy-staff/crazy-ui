import { Button, Card, Reveal } from '@crazy-staff/ui';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

const features = ['God mode', 'Infinite mana', 'Teleport', 'Spawn items', 'Time of day', 'Free camera'];

export default function RevealGroup() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Reveal.Group key={run} className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {features.map((f) => (
          <Reveal.Item key={f}>
            <Card className="px-4 py-3 text-sm font-medium">{f}</Card>
          </Reveal.Item>
        ))}
      </Reveal.Group>
      <Button size="sm" variant="ghost" onClick={() => setRun((r) => r + 1)}>
        <RotateCcw /> Replay
      </Button>
    </div>
  );
}
