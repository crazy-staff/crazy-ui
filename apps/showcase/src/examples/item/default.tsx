import { Item, Switch } from '@crazy-staff/ui';
import { Shield } from 'lucide-react';

export default function ItemDefault() {
  return (
    <Item
      variant="outline"
      className="max-w-md"
      icon={<Shield />}
      title="God mode"
      description="The hero takes no damage from monsters, falls or magic."
      actions={<Switch aria-label="God mode" defaultChecked />}
    />
  );
}
