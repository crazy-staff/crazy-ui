import { Button } from '@crazy-staff/ui';
import { ExternalLink } from 'lucide-react';

export default function ButtonAsLink() {
  return (
    <Button
      variant="outline"
      nativeButton={false}
      render={<a href="https://github.com/crazy-staff" target="_blank" rel="noreferrer" />}
    >
      Open on GitHub <ExternalLink />
    </Button>
  );
}
