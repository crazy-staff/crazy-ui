import { Input } from '@crazy-staff/ui';

export default function InputSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input size="sm" placeholder="Small: filter testers…" />
      <Input size="md" placeholder="Medium: search features…" />
      <Input size="lg" placeholder="Large: ask the hub anything…" />
    </div>
  );
}
