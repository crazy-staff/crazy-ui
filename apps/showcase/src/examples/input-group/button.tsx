import { Button, InputGroup } from '@crazy-staff/ui';
import { Copy } from 'lucide-react';

export default function InputGroupButton() {
  return (
    <InputGroup
      className="max-w-sm pe-1.5"
      aria-label="Invite link"
      readOnly
      defaultValue="crazy-hub.dev/invite/old-camp"
      end={
        <Button size="icon-sm" variant="ghost" aria-label="Copy link">
          <Copy />
        </Button>
      }
    />
  );
}
