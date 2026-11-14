import { Chart } from '@crazy-staff/ui';

const builds = [
  { build: '0.8.0', stable: 21, beta: 9, nightly: 3 },
  { build: '0.8.1', stable: 24, beta: 11, nightly: 4 },
  { build: '0.8.2', stable: 26, beta: 14, nightly: 6 },
  { build: '0.9.0', stable: 30, beta: 18, nightly: 5 },
  { build: '0.9.1', stable: 33, beta: 17, nightly: 8 },
  { build: '0.9.2', stable: 37, beta: 21, nightly: 9 },
];

export default function ChartTooltip() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="area"
      data={builds}
      x="build"
      series={[
        { key: 'stable', label: 'Stable' },
        { key: 'beta', label: 'Beta' },
        { key: 'nightly', label: 'Nightly' },
      ]}
      ariaLabel="Active testers per build and channel"
    />
  );
}
