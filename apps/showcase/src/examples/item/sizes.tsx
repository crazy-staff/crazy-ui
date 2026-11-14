import { Item } from '@crazy-staff/ui';
import { Zap } from 'lucide-react';

export default function ItemSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Item variant="outline" icon={<Zap />} title="Medium (default)" description="Infinite mana" />
      <Item variant="outline" size="sm" title="Small" description="Infinite stamina" />
    </div>
  );
}
