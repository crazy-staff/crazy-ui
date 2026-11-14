import { Button, Chart } from '@crazy-staff/ui';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

const weeks = [
  { week: 'W32', votes: 84 },
  { week: 'W33', votes: 112 },
  { week: 'W34', votes: 98 },
  { week: 'W35', votes: 146 },
  { week: 'W36', votes: 171 },
  { week: 'W37', votes: 160 },
  { week: 'W38', votes: 214 },
  { week: 'W39', votes: 238 },
];

export default function ChartAnimation() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex w-full max-w-2xl flex-col items-start gap-4">
      <Button size="sm" variant="outline" onClick={() => setRun((n) => n + 1)}>
        <RotateCcw />
        Replay
      </Button>
      <Chart
        key={run}
        className="w-full"
        type="area"
        data={weeks}
        x="week"
        series={[{ key: 'votes', label: 'Votes' }]}
        ariaLabel="Votes per week"
      />
    </div>
  );
}
