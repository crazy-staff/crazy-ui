import { Button } from '@crazy-staff/ui';

export default function GlowFrame() {
  return (
    <div className="squircle glow flex w-full max-w-lg flex-col items-center gap-3 rounded-panel border border-border bg-surface px-8 py-12 text-center">
      <h3 className="font-heading text-xl font-semibold tracking-tight">Become a tester</h3>
      <p className="max-w-sm text-sm text-muted">Get nightly builds of the trainer and a tester rank on crazy-hub.</p>
      <Button glow className="mt-2">
        Join the beta
      </Button>
    </div>
  );
}
