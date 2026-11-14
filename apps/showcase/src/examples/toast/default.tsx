import { Button, Toaster, toast } from '@crazy-staff/ui';

export default function ToastDefault() {
  return (
    <>
      <Toaster />
      <Button variant="outline" onClick={() => toast('Build copied to the game folder')}>
        Show a toast
      </Button>
    </>
  );
}
