import { Button } from '@crazy-staff/ui';
import { Copy, Heart, Settings, Trash2 } from 'lucide-react';

export default function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="icon" aria-label="Settings">
        <Settings />
      </Button>
      <Button size="icon" variant="outline" aria-label="Copy link">
        <Copy />
      </Button>
      <Button size="icon" variant="soft" aria-label="Add to favourites">
        <Heart />
      </Button>
      <Button size="icon-sm" variant="ghost" aria-label="Delete">
        <Trash2 />
      </Button>
    </div>
  );
}
