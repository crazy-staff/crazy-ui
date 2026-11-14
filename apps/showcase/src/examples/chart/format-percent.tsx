import { Chart } from '@crazy-staff/ui';

const builds = [
  { build: '0.6', crashFree: 0.88 },
  { build: '0.7', crashFree: 0.92 },
  { build: '0.8', crashFree: 0.95 },
  { build: '0.9', crashFree: 0.979 },
  { build: '0.9.1', crashFree: 0.986 },
];

export default function ChartFormatPercent() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="line"
      curve="linear"
      points
      data={builds}
      x="build"
      valueFormat="percent"
      height={220}
      series={[{ key: 'crashFree', label: 'Crash-free sessions' }]}
      ariaLabel="Crash-free sessions per build"
    />
  );
}
