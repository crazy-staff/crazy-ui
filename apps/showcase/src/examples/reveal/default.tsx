import { Button, Card, Reveal } from '@crazy-staff/ui';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function RevealDefault() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <Reveal key={run} className="w-full">
        <Card title="Build 0.9 is out" description="Teleports, kits and a fix for the arena crash." />
      </Reveal>
      <Button size="sm" variant="ghost" onClick={() => setRun((r) => r + 1)}>
        <RotateCcw /> Replay
      </Button>
    </div>
  );
}
