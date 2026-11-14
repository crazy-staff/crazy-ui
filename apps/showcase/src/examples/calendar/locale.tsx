import { Calendar } from '@crazy-staff/ui';

export default function CalendarLocale() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Calendar locale="pl" />
      <Calendar locale="en-US" weekStartsOn={0} showOutsideDays={false} />
    </div>
  );
}
