import { Button, Chip, Reveal } from '@crazy-staff/ui';
import { Download, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function RevealDefault() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Reveal.Group key={run} stagger={0.09} className="flex max-w-lg flex-col items-center gap-4 text-center">
        <Reveal.Item>
          <Chip>
            <Sparkles /> Build 0.9 is out
          </Chip>
        </Reveal.Item>
        <Reveal.Item>
          <h3 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Every cheat for Gothic, in one menu
          </h3>
        </Reveal.Item>
        <Reveal.Item>
          <p className="text-muted text-balance">
            God mode, teleports, item kits and a free camera. Open it in game with F1, no console needed.
          </p>
        </Reveal.Item>
        <Reveal.Item className="flex flex-wrap justify-center gap-2">
          <Button>
            <Download /> Download
          </Button>
          <Button variant="outline">Read the changelog</Button>
        </Reveal.Item>
      </Reveal.Group>
      <Button size="sm" variant="ghost" onClick={() => setRun((r) => r + 1)}>
        <RotateCcw /> Replay
      </Button>
    </div>
  );
}
