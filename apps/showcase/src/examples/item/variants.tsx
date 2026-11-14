import { Item } from '@crazy-staff/ui';
import { Sparkles } from 'lucide-react';

export default function ItemVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Item icon={<Sparkles />} title="Plain" description="No frame; for rows inside a group." />
      <Item variant="outline" icon={<Sparkles />} title="Outline" description="A hairline frame on the surface." />
      <Item variant="muted" icon={<Sparkles />} title="Muted" description="A soft grey fill without a border." />
    </div>
  );
}
