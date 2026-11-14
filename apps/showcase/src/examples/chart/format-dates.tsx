import { Chart } from '@crazy-staff/ui';

const months = [
  { month: new Date('2026-04-01'), votes: 1840 },
  { month: new Date('2026-05-01'), votes: 2610 },
  { month: new Date('2026-06-01'), votes: 3120 },
  { month: new Date('2026-07-01'), votes: 4480 },
  { month: new Date('2026-08-01'), votes: 5230 },
  { month: new Date('2026-09-01'), votes: 7950 },
  { month: new Date('2026-10-01'), votes: 11300 },
];

export default function ChartFormatDates() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="area"
      data={months}
      x="month"
      xFormat="month"
      valueFormat="compact"
      series={[{ key: 'votes', label: 'Votes' }]}
      ariaLabel="Votes per month"
    />
  );
}
