import { Button, Empty } from '@crazy-staff/ui';
import { Inbox, Plus } from 'lucide-react';

export default function EmptyDefault() {
  return (
    <Empty
      className="max-w-md"
      icon={<Inbox />}
      title="No ideas yet"
      description="Be the first to suggest a feature for the trainer."
      action={
        <Button size="sm">
          <Plus /> New idea
        </Button>
      }
    />
  );
}
