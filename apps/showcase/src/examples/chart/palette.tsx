import { Chart } from '@crazy-staff/ui';

const testers = [
  { week: 'W1', a: 4, b: 6, c: 3, d: 5, e: 2, f: 1 },
  { week: 'W2', a: 6, b: 5, c: 4, d: 6, e: 3, f: 2 },
  { week: 'W3', a: 7, b: 7, c: 6, d: 4, e: 5, f: 3 },
  { week: 'W4', a: 9, b: 6, c: 7, d: 5, e: 6, f: 4 },
];

export default function ChartPalette() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="bar"
      data={testers}
      x="week"
      series={['a', 'b', 'c', 'd', 'e', 'f'].map((key, i) => ({ key, label: `Tester ${i + 1}` }))}
      ariaLabel="Reports per tester and week"
    />
  );
}
