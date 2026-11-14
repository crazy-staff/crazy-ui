import { Input, Label } from '@crazy-staff/ui';

export default function LabelRequired() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="post-title" required>
        Post title
      </Label>
      <Input id="post-title" required placeholder="Add a weather switch" />
    </div>
  );
}
