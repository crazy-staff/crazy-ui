import { Item } from '@crazy-staff/ui';
import { ChevronRight, MessageSquare } from 'lucide-react';

export default function ItemLink() {
  return (
    <Item
      render={<a href="#post" />}
      variant="outline"
      className="max-w-md"
      icon={<MessageSquare />}
      title="Add a teleport menu"
      description="128 votes · 14 comments · planned for 0.10"
      actions={<ChevronRight className="size-4 text-muted" />}
    />
  );
}
