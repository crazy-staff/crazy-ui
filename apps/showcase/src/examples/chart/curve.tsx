import { Chart, ToggleGroup } from '@crazy-staff/ui';
import { useState } from 'react';

const builds = [
  { build: '0.7.0', reports: 42 },
  { build: '0.7.1', reports: 18 },
  { build: '0.8.0', reports: 35 },
  { build: '0.8.1', reports: 12 },
  { build: '0.8.2', reports: 14 },
  { build: '0.9.0', reports: 27 },
  { build: '0.9.1', reports: 9 },
];

export default function ChartCurve() {
  const [curve, setCurve] = useState<'smooth' | 'linear'>('smooth');
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <ToggleGroup
        aria-label="Curve"
        size="sm"
        value={[curve]}
        onValueChange={(value) => value[0] && setCurve(value[0] as 'smooth' | 'linear')}
        items={[
          { value: 'smooth', label: 'Smooth' },
          { value: 'linear', label: 'Linear' },
        ]}
      />
      <Chart
        type="area"
        curve={curve}
        points
        data={builds}
        x="build"
        series={[{ key: 'reports', label: 'Crash reports' }]}
        ariaLabel="Crash reports per build"
      />
    </div>
  );
}
