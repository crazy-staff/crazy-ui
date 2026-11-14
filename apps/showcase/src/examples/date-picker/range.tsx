import { DatePicker, type DateRange } from '@crazy-staff/ui';
import { useState } from 'react';

export default function DatePickerRange() {
  const [range, setRange] = useState<DateRange | null>(null);
  return (
    <DatePicker
      mode="range"
      numberOfMonths={2}
      value={range}
      onValueChange={setRange}
      placeholder="Test window"
      className="w-72"
    />
  );
}
