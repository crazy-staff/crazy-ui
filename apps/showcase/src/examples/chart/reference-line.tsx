import { Chart } from '@crazy-staff/ui';

const weeks = [
  { week: 'W32', active: 18 },
  { week: 'W33', active: 22 },
  { week: 'W34', active: 21 },
  { week: 'W35', active: 29 },
  { week: 'W36', active: 34 },
  { week: 'W37', active: 31 },
  { week: 'W38', active: 38 },
  { week: 'W39', active: 44 },
];

export default function ChartReferenceLine() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="bar"
      data={weeks}
      x="week"
      series={[{ key: 'active', label: 'Active testers' }]}
      referenceLines={[{ value: 40, label: 'Goal for 1.0: 40 testers' }]}
      ariaLabel="Active testers per week against the goal of 40"
    />
  );
}
