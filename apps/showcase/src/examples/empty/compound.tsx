import { Avatar, Button, Empty } from '@crazy-staff/ui';
import { Users } from 'lucide-react';

export default function EmptyCompound() {
  return (
    <Empty.Root className="max-w-md">
      <Empty.Icon>
        <Users />
      </Empty.Icon>
      <Empty.Title>No testers on this build</Empty.Title>
      <Empty.Description>Invite people from the tester list. They get the build and a feedback form.</Empty.Description>
      <div className="mt-4 flex -space-x-2">
        {['Diego', 'Milten', 'Gorn'].map((n) => (
          <Avatar key={n} name={n} size="sm" className="ring-2 ring-surface" />
        ))}
      </div>
      <Empty.Actions>
        <Button size="sm" variant="soft">
          Invite testers
        </Button>
      </Empty.Actions>
    </Empty.Root>
  );
}
