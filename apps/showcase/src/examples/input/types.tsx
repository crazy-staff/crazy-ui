import { Input } from '@crazy-staff/ui';

export default function InputTypes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input type="email" placeholder="tester@crazy-hub.dev" />
      <Input type="password" placeholder="Password" />
      <Input type="url" placeholder="https://crazy-hub.dev/u/xardas" aria-label="Profile URL" />
    </div>
  );
}
