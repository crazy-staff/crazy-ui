import { Chart } from '@crazy-staff/ui';

const weeks = [
  { week: 'W32', votes: 84, comments: 31 },
  { week: 'W33', votes: 112, comments: 46 },
  { week: 'W34', votes: 98, comments: 52 },
  { week: 'W35', votes: 146, comments: 61 },
  { week: 'W36', votes: 171, comments: 88 },
  { week: 'W37', votes: 160, comments: 74 },
  { week: 'W38', votes: 214, comments: 95 },
  { week: 'W39', votes: 238, comments: 120 },
];

export default function ChartArea() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="area"
      data={weeks}
      x="week"
      series={[
        { key: 'votes', label: 'Votes' },
        { key: 'comments', label: 'Comments' },
      ]}
      ariaLabel="Votes and comments per week"
    />
  );
}
