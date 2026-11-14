import { Button } from '@crazy-staff/ui';
import { Play } from 'lucide-react';

export default function ButtonGlow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="lg" glow>
        <Play /> Start the trainer
      </Button>
      <Button size="lg" variant="ghost">
        Read the docs
      </Button>
    </div>
  );
}
