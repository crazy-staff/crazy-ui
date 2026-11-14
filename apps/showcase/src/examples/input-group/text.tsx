import { InputGroup } from '@crazy-staff/ui';

export default function InputGroupText() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <InputGroup aria-label="Profile URL" start="crazy-hub.dev/u/" placeholder="xardas" />
      <InputGroup aria-label="Gold" inputMode="numeric" defaultValue="500" end="ore" />
    </div>
  );
}
