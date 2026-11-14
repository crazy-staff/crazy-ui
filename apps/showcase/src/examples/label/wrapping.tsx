import { Label } from '@crazy-staff/ui';

export default function LabelWrapping() {
  return (
    <Label className="gap-2.5">
      <input type="checkbox" defaultChecked className="size-4 accent-accent" />
      Show hidden items on the map
    </Label>
  );
}
