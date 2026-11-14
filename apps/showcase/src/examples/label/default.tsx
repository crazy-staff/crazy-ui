import { Input, Label } from '@crazy-staff/ui';

export default function LabelDefault() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="hero-name">Hero name</Label>
      <Input id="hero-name" placeholder="Nameless hero" />
    </div>
  );
}
