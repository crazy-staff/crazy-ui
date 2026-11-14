import { DatePicker } from '@crazy-staff/ui';

export default function DatePickerSizes() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <DatePicker size="sm" placeholder="Small" />
      <DatePicker size="md" placeholder="Medium" />
      <DatePicker size="lg" placeholder="Large" />
    </div>
  );
}
