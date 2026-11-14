import { Chart, Switch } from '@crazy-staff/ui';
import { useState } from 'react';

const weeks = [
  { week: 'W36', reports: 31 },
  { week: 'W37', reports: 24 },
  { week: 'W38', reports: 27 },
  { week: 'W39', reports: 15 },
  { week: 'W40', reports: 11 },
];

export default function ChartLoading() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <Switch label="Loading" checked={loading} onCheckedChange={setLoading} />
      <Chart
        type="bar"
        loading={loading}
        data={weeks}
        x="week"
        height={220}
        series={[{ key: 'reports', label: 'Crash reports' }]}
        ariaLabel="Crash reports per week"
      />
    </div>
  );
}
