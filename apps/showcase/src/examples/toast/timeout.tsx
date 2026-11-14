import { Button, toast } from '@crazy-staff/ui';

export default function ToastTimeout() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="outline" onClick={() => toast('Quick save done', { timeout: 1500 })}>
        1.5 seconds
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning('Save before you continue', {
            description: 'Meteor rain may crash the game. This stays until you close it.',
            timeout: 0,
          })
        }
      >
        Until closed
      </Button>
    </div>
  );
}
