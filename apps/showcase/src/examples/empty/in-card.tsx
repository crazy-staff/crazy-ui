import { Button, Empty } from '@crazy-staff/ui';
import { Map } from 'lucide-react';

export default function EmptyInCard() {
  return (
    <div className="squircle flex w-full max-w-md flex-col gap-3 rounded-card border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Saved teleports</span>
        <span className="text-xs text-muted">0 markers</span>
      </div>
      <Empty
        className="border-border bg-background py-8"
        icon={<Map />}
        title="No markers saved"
        description="Stand where you want to return and press F6 in the game."
        action={
          <Button size="sm" variant="outline">
            How markers work
          </Button>
        }
      />
    </div>
  );
}
