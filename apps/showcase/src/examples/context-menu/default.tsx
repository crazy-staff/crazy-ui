import { ContextMenu } from '@crazy-staff/ui';
import { Copy, Pencil, Share2, Trash2 } from 'lucide-react';

export default function ContextMenuDefault() {
  return (
    <ContextMenu
      className="squircle flex h-44 w-full max-w-md items-center justify-center rounded-card border border-dashed border-border-strong text-sm text-muted"
      items={[
        { label: 'Copy', icon: <Copy />, shortcut: 'Ctrl C' },
        { label: 'Rename', icon: <Pencil />, shortcut: 'F2' },
        { label: 'Share', icon: <Share2 /> },
        { type: 'separator' },
        { label: 'Delete', icon: <Trash2 />, danger: true, shortcut: 'Del' },
      ]}
    >
      Right-click (or long-press) here
    </ContextMenu>
  );
}
