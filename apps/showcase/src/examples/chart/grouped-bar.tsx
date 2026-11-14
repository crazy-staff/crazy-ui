import { Chart } from '@crazy-staff/ui';

const builds = [
  { build: '0.8.0', crash: 14, freeze: 8, visual: 21 },
  { build: '0.8.1', crash: 9, freeze: 6, visual: 17 },
  { build: '0.8.2', crash: 11, freeze: 4, visual: 12 },
  { build: '0.9.0', crash: 6, freeze: 5, visual: 9 },
  { build: '0.9.1', crash: 3, freeze: 2, visual: 7 },
];

export default function ChartGroupedBar() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="bar"
      gradient
      legendPosition="bottom"
      data={builds}
      x="build"
      series={[
        { key: 'crash', label: 'Crash to desktop' },
        { key: 'freeze', label: 'Freeze' },
        { key: 'visual', label: 'Visual glitch' },
      ]}
      ariaLabel="Crash reports per build and kind"
    />
  );
}
