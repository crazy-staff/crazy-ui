import { Button, toast } from '@crazy-staff/ui';
import { Upload } from 'lucide-react';

function uploadReport() {
  return new Promise<number>((resolve, reject) =>
    setTimeout(() => (Math.random() > 0.3 ? resolve(48) : reject(new Error('timeout'))), 1500),
  );
}

export default function ToastPromise() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.promise(uploadReport(), {
          loading: 'Sending test report…',
          success: (n) => ({ title: 'Report sent', description: `That's report number ${n}. Thank you!` }),
          error: { title: 'Report not sent', description: 'The hub did not answer. Try again in a minute.' },
        })
      }
    >
      <Upload /> Send test report
    </Button>
  );
}
