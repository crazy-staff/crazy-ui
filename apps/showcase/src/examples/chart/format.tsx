import { Chart } from '@crazy-staff/ui';

const builds = [
  { build: '0.6', crashRate: 0.12 },
  { build: '0.7', crashRate: 0.08 },
  { build: '0.8', crashRate: 0.05 },
  { build: '0.9', crashRate: 0.021 },
];
const percent = new Intl.NumberFormat('en', { style: 'percent', maximumFractionDigits: 1 });

export default function ChartFormat() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="bar"
      data={builds}
      x="build"
      series={[{ key: 'crashRate', label: 'Crash rate' }]}
      valueFormat={(v) => percent.format(v)}
      height={220}
      ariaLabel="Crash rate per build"
    />
  );
}
