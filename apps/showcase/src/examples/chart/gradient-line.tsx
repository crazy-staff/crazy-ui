import { Chart } from '@crazy-staff/ui';

const days = [
  { day: 'Mon', sessions: 132 },
  { day: 'Tue', sessions: 148 },
  { day: 'Wed', sessions: 141 },
  { day: 'Thu', sessions: 186 },
  { day: 'Fri', sessions: 224 },
  { day: 'Sat', sessions: 301 },
  { day: 'Sun', sessions: 276 },
];

export default function ChartGradientLine() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="line"
      gradient
      data={days}
      x="day"
      height={220}
      series={[{ key: 'sessions', label: 'Trainer sessions' }]}
      ariaLabel="Trainer sessions per day this week"
    />
  );
}
