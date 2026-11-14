import { Button, Tabs } from '@crazy-staff/ui';
import { useState } from 'react';

const steps = ['download', 'install', 'play'];

export default function TabsControlled() {
  const [step, setStep] = useState('download');
  const index = steps.indexOf(step);
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Tabs
        value={step}
        onValueChange={(value) => setStep(value as string)}
        items={[
          { value: 'download', label: '1. Download', content: <p className="text-sm text-muted">Get the latest build from the releases page.</p> },
          { value: 'install', label: '2. Install', content: <p className="text-sm text-muted">Unzip it into the Gothic folder, next to the game.</p> },
          { value: 'play', label: '3. Play', content: <p className="text-sm text-muted">Start the game and press F1 to open the menu.</p> },
        ]}
      />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" disabled={index === 0} onClick={() => setStep(steps[index - 1]!)}>
          Back
        </Button>
        <Button size="sm" disabled={index === steps.length - 1} onClick={() => setStep(steps[index + 1]!)}>
          Next step
        </Button>
      </div>
    </div>
  );
}
