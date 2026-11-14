import { Button, DropdownMenu } from '@crazy-staff/ui';
import { ChevronDown, Copy, Pencil, Share2, Trash2 } from 'lucide-react';

export default function DropdownMenuDefault() {
  return (
    <DropdownMenu
      trigger={
        <Button variant="outline">
          Kit options <ChevronDown />
        </Button>
      }
      items={[
        { label: 'Rename', icon: <Pencil />, shortcut: 'F2' },
        { label: 'Duplicate', icon: <Copy />, shortcut: 'Ctrl D' },
        { label: 'Share', icon: <Share2 /> },
        { type: 'separator' },
        { label: 'Delete', icon: <Trash2 />, danger: true },
      ]}
    />
  );
}
