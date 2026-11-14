import { Button, Tooltip } from '@crazy-staff/ui';
import { Copy } from 'lucide-react';

export default function TooltipDefault() {
  return (
    <Tooltip content="Copy invite link">
      <Button size="icon" variant="outline" aria-label="Copy invite link">
        <Copy />
      </Button>
    </Tooltip>
  );
}
