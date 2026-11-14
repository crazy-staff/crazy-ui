import { Calendar } from '@crazy-staff/ui';

const today = new Date();

export default function CalendarDisabledDates() {
  return (
    <Calendar
      aria-label="Tester call slot"
      min={today}
      max={new Date(today.getFullYear(), today.getMonth() + 2, 0)}
      disabledDates={(date) => date.getDay() === 0 || date.getDay() === 6}
    />
  );
}
