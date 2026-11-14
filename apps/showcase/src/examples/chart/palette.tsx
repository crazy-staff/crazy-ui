import { Chart } from '@crazy-staff/ui';

const weeks = [
  { week: 'W36', a: 4, b: 6, c: 3, d: 5, e: 2, f: 1 },
  { week: 'W37', a: 6, b: 5, c: 4, d: 6, e: 3, f: 2 },
  { week: 'W38', a: 7, b: 7, c: 6, d: 4, e: 5, f: 3 },
  { week: 'W39', a: 9, b: 6, c: 7, d: 5, e: 6, f: 4 },
];

const testers = ['Gorn', 'Diego', 'Milten', 'Lester', 'Lares', 'Cavalorn'];

export default function ChartPalette() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="bar"
      data={weeks}
      x="week"
      series={['a', 'b', 'c', 'd', 'e', 'f'].map((key, i) => ({ key, label: testers[i] }))}
      ariaLabel="Reports per tester and week"
    />
  );
}
