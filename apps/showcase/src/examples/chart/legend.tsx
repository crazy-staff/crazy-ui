import { Chart } from '@crazy-staff/ui';

const weeks = [
  { week: 'W34', open: 24, planned: 9, progress: 4, done: 3 },
  { week: 'W35', open: 31, planned: 11, progress: 5, done: 6 },
  { week: 'W36', open: 28, planned: 14, progress: 7, done: 9 },
  { week: 'W37', open: 35, planned: 12, progress: 8, done: 13 },
  { week: 'W38', open: 33, planned: 16, progress: 6, done: 18 },
  { week: 'W39', open: 39, planned: 15, progress: 9, done: 22 },
];

export default function ChartLegend() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="line"
      data={weeks}
      x="week"
      defaultHiddenSeries={['open']}
      series={[
        { key: 'open', label: 'Open' },
        { key: 'planned', label: 'Planned' },
        { key: 'progress', label: 'In progress' },
        { key: 'done', label: 'Done' },
      ]}
      ariaLabel="Posts by status per week"
    />
  );
}
