import { Button, Chip } from '@crazy-staff/ui';

export default function GlowPage() {
  return (
    <div className="squircle relative isolate w-full max-w-2xl overflow-hidden rounded-panel border border-border bg-background">
      <div aria-hidden className="glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-72" />
      <div className="flex flex-col gap-3 px-8 pt-12 pb-10">
        <Chip className="self-start">Roadmap</Chip>
        <h2 className="font-heading text-2xl font-semibold tracking-tight">What we build next</h2>
        <p className="max-w-md text-sm text-muted">Vote on ideas for the Crazy Gothic Trainer; the top ones move to Planned every Friday.</p>
        <div className="flex gap-2 pt-2">
          <Button glow>Post an idea</Button>
          <Button variant="outline">Browse ideas</Button>
        </div>
      </div>
    </div>
  );
}
