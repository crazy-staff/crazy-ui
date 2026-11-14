import { Collapsible } from '@crazy-staff/ui';
import { ChevronsUpDown } from 'lucide-react';

export default function CollapsibleCustomTrigger() {
  return (
    <Collapsible.Root className="w-full max-w-sm gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">3 hidden replies</span>
        <Collapsible.Trigger chevron={false} aria-label="Toggle replies" className="size-control-sm justify-center p-0">
          <ChevronsUpDown />
        </Collapsible.Trigger>
      </div>
      <Collapsible.Panel>
        <div className="flex flex-col gap-2 text-sm text-muted">
          <p className="squircle rounded-item bg-surface-2 px-3 py-2">Works on my save too.</p>
          <p className="squircle rounded-item bg-surface-2 px-3 py-2">Confirmed on build 0.9.1.</p>
          <p className="squircle rounded-item bg-surface-2 px-3 py-2">Marked as verified.</p>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
