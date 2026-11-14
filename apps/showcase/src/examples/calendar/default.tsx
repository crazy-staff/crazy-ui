import { Calendar } from '@crazy-staff/ui';
import { useState } from 'react';

export default function CalendarDefault() {
  const [date, setDate] = useState<Date | null>(new Date());
  return <Calendar value={date} onValueChange={setDate} />;
}
