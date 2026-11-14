import { AlertDialog, Button, DropdownMenu } from '@crazy-staff/ui';
import { EyeOff, MoreHorizontal, Pin, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function AlertDialogFromMenu() {
  const [confirm, setConfirm] = useState(false);
  const [status, setStatus] = useState('Post: “Add a Chronicles of Myrtana build”');

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted">{status}</span>
      <DropdownMenu
        align="end"
        trigger={
          <Button size="icon-sm" variant="ghost" aria-label="Moderate post">
            <MoreHorizontal />
          </Button>
        }
        items={[
          { type: 'label', label: 'Moderate' },
          { label: 'Pin to top', icon: <Pin />, onClick: () => setStatus('Pinned to top') },
          { label: 'Hide from board', icon: <EyeOff />, onClick: () => setStatus('Hidden from the board') },
          { type: 'separator' },
          { label: 'Delete…', icon: <Trash2 />, danger: true, onClick: () => setConfirm(true) },
        ]}
      />
      <AlertDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="Delete this post?"
        description="It disappears from the board, the roadmap and every vote count."
        actionLabel="Delete"
        tone="danger"
        onAction={() => setStatus('Post deleted')}
      />
    </div>
  );
}
