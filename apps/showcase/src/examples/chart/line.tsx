import { Chart } from '@crazy-staff/ui';

const weeks = [
  { week: 'W32', active: 18, joined: 6 },
  { week: 'W33', active: 22, joined: 5 },
  { week: 'W34', active: 21, joined: 3 },
  { week: 'W35', active: 29, joined: 9 },
  { week: 'W36', active: 34, joined: 7 },
  { week: 'W37', active: 31, joined: 4 },
  { week: 'W38', active: 38, joined: 8 },
  { week: 'W39', active: 44, joined: 10 },
];

export default function ChartLine() {
  return (
    <Chart
      className="w-full max-w-2xl"
      data={weeks}
      x="week"
      points
      series={[
        { key: 'active', label: 'Active testers' },
        { key: 'joined', label: 'New testers' },
      ]}
      ariaLabel="Active and new testers per week"
    />
  );
}
