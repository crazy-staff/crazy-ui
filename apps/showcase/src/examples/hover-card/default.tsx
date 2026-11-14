import { Avatar, Chip, HoverCard } from '@crazy-staff/ui';

export default function HoverCardDefault() {
  return (
    <p className="text-sm">
      Planned by{' '}
      <HoverCard
        trigger={
          <a href="#dawid" className="font-medium text-accent-soft-foreground underline decoration-dotted underline-offset-4">
            @dawid
          </a>
        }
      >
        <div className="flex gap-3">
          <Avatar name="Dawid" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Dawid</span>
            <span className="text-muted">Leads crazy-ui, crazy-hub and the Crazy Gothic Trainer.</span>
            <Chip size="sm" className="mt-1 self-start">
              project lead
            </Chip>
          </div>
        </div>
      </HoverCard>
    </p>
  );
}
