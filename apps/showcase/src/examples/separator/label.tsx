import { Button, Separator } from '@crazy-staff/ui';

export default function SeparatorLabel() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Button variant="outline">Sign in with GitHub</Button>
      <Separator label="or" />
      <Button variant="soft">Sign in with e-mail</Button>
    </div>
  );
}
