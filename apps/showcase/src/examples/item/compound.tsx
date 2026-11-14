import { Button, Item } from '@crazy-staff/ui';
import { Download } from 'lucide-react';

export default function ItemCompound() {
  return (
    <Item.Root variant="muted" className="max-w-md">
      <Item.Media variant="icon">
        <Download />
      </Item.Media>
      <Item.Content>
        <Item.Title>Build 0.9.2</Item.Title>
        <Item.Description>Fixes the arena crash and adds meteor craters.</Item.Description>
      </Item.Content>
      <Item.Actions>
        <Button size="sm">Download</Button>
      </Item.Actions>
    </Item.Root>
  );
}
