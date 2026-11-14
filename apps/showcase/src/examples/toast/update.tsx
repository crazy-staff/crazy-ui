import { Button, toast } from '@crazy-staff/ui';
import { FolderInput } from 'lucide-react';

export default function ToastUpdate() {
  function install() {
    const id = toast.loading('Copying build 0.9…', { description: 'Into the Gothic folder' });
    setTimeout(() => toast.update(id, { title: 'Checking files…' }), 1200);
    setTimeout(
      () => toast.update(id, { title: 'Build 0.9 installed', description: 'Start the game and press F5.', type: 'success', timeout: 5000 }),
      2400,
    );
  }

  return (
    <Button onClick={install}>
      <FolderInput /> Install build
    </Button>
  );
}
