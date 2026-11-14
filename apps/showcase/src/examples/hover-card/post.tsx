import { Chip, HoverCard } from '@crazy-staff/ui';
import { ChevronUp, MessageSquare } from 'lucide-react';

export default function HoverCardPost() {
  return (
    <p className="text-sm">
      Duplicate of{' '}
      <HoverCard
        align="start"
        trigger={
          <a href="#post-128" className="font-medium text-accent-soft-foreground underline decoration-dotted underline-offset-4">
            #128
          </a>
        }
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Chip size="sm">planned</Chip>
            <span className="text-xs text-muted">#128 · by Marta Nowak</span>
          </div>
          <span className="font-semibold">Save teleport markers per save file</span>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1">
              <ChevronUp className="size-3.5" /> 42 votes
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="size-3.5" /> 7 comments
            </span>
          </div>
        </div>
      </HoverCard>
    </p>
  );
}
