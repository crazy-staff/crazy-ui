import { Avatar, Button, Item } from '@crazy-staff/ui';

export default function ItemAvatar() {
  return (
    <Item
      variant="outline"
      className="max-w-md"
      media={<Avatar name="Diego" />}
      title="Diego"
      description="Tester · 42 reports this month"
      actions={<Button size="sm" variant="outline">Profile</Button>}
    />
  );
}
