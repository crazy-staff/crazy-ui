import { Button, toast } from '@crazy-staff/ui';

export default function ToastTypes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="outline" onClick={() => toast('Menu position reset')}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success('Kit saved')}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info('Build 0.9.1 is available')}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning('Polymorph works badly in this build')}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error('Could not reach the game')}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.loading('Waiting for Gothic to start…', { timeout: 3000 })}>
        Loading
      </Button>
    </div>
  );
}
