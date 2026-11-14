import { Button, Chip, Drawer } from '@crazy-staff/ui';
import { Package } from 'lucide-react';

const items = ['Rusty sword', 'Leather armour', '5 × Healing potion', 'Torch'];

export default function DrawerDefault() {
  return (
    <Drawer
      trigger={
        <Button variant="outline">
          <Package /> Warrior starter
        </Button>
      }
      title="Warrior starter"
      description="Swipe down or press Escape to close."
      footer={<Drawer.Close render={<Button className="w-full sm:w-auto" />}>Spawn kit</Drawer.Close>}
    >
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="squircle flex items-center justify-between rounded-item bg-surface-2 px-3 py-2">
            {item}
            <Chip size="sm" variant="neutral">
              item
            </Chip>
          </li>
        ))}
      </ul>
    </Drawer>
  );
}
