import { Button, Card, Reveal } from '@crazy-staff/ui';
import { Camera, Clock, Heart, MapPin, Package, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';

const features = [
  { icon: Heart, title: 'God mode', text: 'No damage from monsters, falls or fire.' },
  { icon: Sparkles, title: 'Infinite mana', text: 'Cast any spell as often as you like.' },
  { icon: MapPin, title: 'Teleport', text: 'Jump to any camp, cave or saved marker.' },
  { icon: Package, title: 'Item kits', text: 'Spawn whole sets of weapons and armour.' },
  { icon: Clock, title: 'Time of day', text: 'Set the hour or freeze the clock.' },
  { icon: Camera, title: 'Free camera', text: 'Fly around the world for screenshots.' },
];

export default function RevealGroup() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Reveal.Group key={run} stagger={0.07} className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <Reveal.Item key={title}>
            <Card className="flex h-full flex-col gap-3 p-4">
              <span className="squircle flex size-9 items-center justify-center rounded-control-sm bg-accent-soft text-accent-soft-foreground">
                <Icon className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-medium">{title}</span>
                <span className="mt-0.5 block text-sm text-muted">{text}</span>
              </span>
            </Card>
          </Reveal.Item>
        ))}
      </Reveal.Group>
      <Button size="sm" variant="ghost" onClick={() => setRun((r) => r + 1)}>
        <RotateCcw /> Replay
      </Button>
    </div>
  );
}
