import { Input, Label } from '@crazy-staff/ui';

export default function LabelDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="api-key" disabled>
        API key
      </Label>
      <Input id="api-key" disabled placeholder="Only admins can change this" />
    </div>
  );
}
