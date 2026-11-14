import { Button, Progress } from '@crazy-staff/ui';
import { useEffect, useState } from 'react';

export default function ProgressLive() {
  const [value, setValue] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setValue((v) => {
        if (v >= 100) {
          setRunning(false);
          return 100;
        }
        return Math.min(100, v + 7);
      });
    }, 300);
    return () => clearInterval(t);
  }, [running]);
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-4">
      <Progress value={value} label={value >= 100 ? 'Build installed' : 'Installing build 0.9'} />
      <Button
        size="sm"
        variant="outline"
        disabled={running}
        onClick={() => {
          setValue(0);
          setRunning(true);
        }}
      >
        {value >= 100 ? 'Install again' : 'Install'}
      </Button>
    </div>
  );
}
