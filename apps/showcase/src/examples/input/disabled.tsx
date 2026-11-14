import { Input } from '@crazy-staff/ui';

export default function InputDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input disabled placeholder="Teleport target (needs a save)" />
      <Input readOnly defaultValue="Build 0.9.2 · Gothic 1 (Steam)" aria-label="Installed build" />
    </div>
  );
}
