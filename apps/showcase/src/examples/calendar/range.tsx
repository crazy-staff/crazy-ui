import { Calendar, type DateRange } from '@crazy-staff/ui';
import { useState } from 'react';

const today = new Date();

export default function CalendarRange() {
  const [range, setRange] = useState<DateRange | null>({
    from: today,
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6),
  });
  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar mode="range" numberOfMonths={2} value={range} onValueChange={setRange} />
      <p className="text-sm text-muted">Pick the first and the last day of the test week.</p>
    </div>
  );
}
