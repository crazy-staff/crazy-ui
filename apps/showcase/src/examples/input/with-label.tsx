import { Input, Label } from '@crazy-staff/ui';

export default function InputWithLabel() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="kit-name">Kit name</Label>
      <Input id="kit-name" placeholder="Old Camp starter kit" />
    </div>
  );
}
