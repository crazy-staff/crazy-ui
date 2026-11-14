import { Button, ButtonGroup } from '@crazy-staff/ui';
import { ChevronDown, Send } from 'lucide-react';

export default function ButtonGroupVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonGroup aria-label="Publish">
        <Button>
          <Send />
          Publish build
        </Button>
        <Button size="icon" aria-label="More publish options" className="border-s border-accent-foreground/15">
          <ChevronDown />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Moderate">
        <Button variant="soft">Approve</Button>
        <Button variant="soft" className="border-s border-accent-soft-foreground/15">
          Merge
        </Button>
      </ButtonGroup>
    </div>
  );
}
