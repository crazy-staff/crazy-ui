import { Button } from '@crazy-staff/ui';

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button disabled>Apply</Button>
      <Button variant="outline" disabled>
        Export
      </Button>
      <Button variant="danger" disabled>
        Delete kit
      </Button>
    </div>
  );
}
