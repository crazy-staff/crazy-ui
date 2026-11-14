import { Button, Reveal } from '@crazy-staff/ui';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function RevealDelay() {
  const [run, setRun] = useState(0);
  return (
    <div key={run} className="flex flex-col items-center gap-3 text-center">
      <Reveal>
        <h3 className="font-heading text-2xl font-semibold tracking-tight">Crazy Gothic Trainer</h3>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-sm text-muted">Cheats, kits and teleports for Gothic, in one menu.</p>
      </Reveal>
      <Reveal delay={0.3}>
        <Button size="sm" variant="ghost" onClick={() => setRun((r) => r + 1)}>
          <RotateCcw /> Replay
        </Button>
      </Reveal>
    </div>
  );
}
