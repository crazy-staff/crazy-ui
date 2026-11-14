import { Chart } from '@crazy-staff/ui';

const months = [
  { month: 'Jun', votes: 120, ideas: 14, comments: 40 },
  { month: 'Jul', votes: 180, ideas: 22, comments: 64 },
  { month: 'Aug', votes: 150, ideas: 18, comments: 58 },
  { month: 'Sep', votes: 260, ideas: 31, comments: 90 },
  { month: 'Oct', votes: 310, ideas: 35, comments: 120 },
  { month: 'Nov', votes: 290, ideas: 40, comments: 104 },
];

export default function ChartDefault() {
  return (
    <Chart
      className="w-full max-w-2xl"
      data={months}
      x="month"
      type="area"
      series={[{ key: 'votes', label: 'Votes' }]}
      ariaLabel="Votes on ideas per month"
    />
  );
}
