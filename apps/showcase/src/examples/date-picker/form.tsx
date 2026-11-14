import { Button, DatePicker, Label } from '@crazy-staff/ui';
import { useState } from 'react';

const today = new Date();

export default function DatePickerForm() {
  const [sent, setSent] = useState('');
  return (
    <form
      className="flex w-72 flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(String(new FormData(e.currentTarget).get('buildDate') ?? ''));
      }}
    >
      <div className="flex flex-col gap-1.5">
        <Label id="build-date">Build date</Label>
        <DatePicker
          name="buildDate"
          aria-labelledby="build-date"
          min={new Date(today.getFullYear(), today.getMonth(), 1)}
          formatOptions={{ weekday: 'short', day: 'numeric', month: 'long' }}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" size="sm">
          Schedule build
        </Button>
        <DatePicker disabled size="sm" placeholder="Locked" className="min-w-0 flex-1" />
      </div>
      {sent && <p className="text-sm text-muted">Sent buildDate={sent}</p>}
    </form>
  );
}
