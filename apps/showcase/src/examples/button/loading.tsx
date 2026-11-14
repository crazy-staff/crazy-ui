import { Button, Spinner } from '@crazy-staff/ui';
import { Upload } from 'lucide-react';
import { useState } from 'react';

export default function ButtonLoading() {
  const [busy, setBusy] = useState(false);

  function publish() {
    setBusy(true);
    setTimeout(() => setBusy(false), 2000);
  }

  return (
    <Button onClick={publish} disabled={busy} aria-busy={busy}>
      {busy ? <Spinner /> : <Upload />}
      {busy ? 'Publishing…' : 'Publish build'}
    </Button>
  );
}
