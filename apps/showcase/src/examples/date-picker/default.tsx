import { DatePicker } from '@crazy-staff/ui';
import { useState } from 'react';

export default function DatePickerDefault() {
  const [date, setDate] = useState<Date | null>(null);
  return <DatePicker value={date} onValueChange={setDate} placeholder="Release date" className="w-64" />;
}
