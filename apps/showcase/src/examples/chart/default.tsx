import { Chart } from '@crazy-staff/ui';

const weeks = [
  { week: new Date('2026-08-03'), votes: 84 },
  { week: new Date('2026-08-10'), votes: 112 },
  { week: new Date('2026-08-17'), votes: 98 },
  { week: new Date('2026-08-24'), votes: 146 },
  { week: new Date('2026-08-31'), votes: 171 },
  { week: new Date('2026-09-07'), votes: 160 },
  { week: new Date('2026-09-14'), votes: 214 },
  { week: new Date('2026-09-21'), votes: 238 },
  { week: new Date('2026-09-28'), votes: 225 },
  { week: new Date('2026-10-05'), votes: 279 },
];

export default function ChartDefault() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="area"
      data={weeks}
      x="week"
      xFormat="week"
      series={[{ key: 'votes', label: 'Votes' }]}
      ariaLabel="Votes on ideas per week"
    />
  );
}
