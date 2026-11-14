import { Textarea } from '@crazy-staff/ui';

export default function TextareaRows() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Textarea rows={2} className="min-h-0" aria-label="Short note" placeholder="rows={2}" />
      <Textarea rows={6} aria-label="Long note" placeholder="rows={6}" />
    </div>
  );
}
