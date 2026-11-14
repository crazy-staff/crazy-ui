import { InputGroup } from '@crazy-staff/ui';
import { Globe } from 'lucide-react';

export default function InputGroupCompound() {
  return (
    <InputGroup.Root className="max-w-sm">
      <InputGroup.Addon>
        <Globe />
        https://
      </InputGroup.Addon>
      <InputGroup.Input aria-label="Server address" placeholder="portal.crazy-hub.dev" />
      <InputGroup.Addon className="font-mono text-xs">:443</InputGroup.Addon>
    </InputGroup.Root>
  );
}
