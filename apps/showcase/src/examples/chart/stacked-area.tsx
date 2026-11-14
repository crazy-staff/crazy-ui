import { Chart } from '@crazy-staff/ui';

const weeks = [
  { week: 'W34', trainer: 64, ui: 22, docs: 9 },
  { week: 'W35', trainer: 81, ui: 30, docs: 12 },
  { week: 'W36', trainer: 76, ui: 41, docs: 15 },
  { week: 'W37', trainer: 102, ui: 38, docs: 21 },
  { week: 'W38', trainer: 118, ui: 52, docs: 19 },
  { week: 'W39', trainer: 134, ui: 61, docs: 27 },
];

export default function ChartStackedArea() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="area"
      stacked
      data={weeks}
      x="week"
      series={[
        { key: 'trainer', label: 'Trainer' },
        { key: 'ui', label: 'Hub UI' },
        { key: 'docs', label: 'Docs' },
      ]}
      ariaLabel="Votes per board and week"
    />
  );
}
