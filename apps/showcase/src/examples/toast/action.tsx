import { Button, toast } from '@crazy-staff/ui';
import { EyeOff } from 'lucide-react';

export default function ToastAction() {
  function hide() {
    const id = toast('Post hidden from the board', {
      description: 'Only moderators can see it now.',
      actionProps: {
        children: 'Undo',
        onClick: () => {
          toast.close(id);
          toast.success('Post visible again');
        },
      },
    });
  }

  return (
    <Button variant="outline" onClick={hide}>
      <EyeOff /> Hide post
    </Button>
  );
}
