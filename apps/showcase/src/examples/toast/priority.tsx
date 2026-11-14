import { Button, toast } from '@crazy-staff/ui';

export default function ToastPriority() {
  return (
    <Button
      variant="danger"
      onClick={() =>
        toast.error('Game crashed', {
          description: 'Meteor rain hit the Old Camp. A crash report was saved.',
          priority: 'high',
        })
      }
    >
      Simulate a crash
    </Button>
  );
}
