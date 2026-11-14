import { Button } from '@crazy-staff/ui';

export default function GlowButton() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button glow>Publish build 0.9.2</Button>
      <Button variant="outline">Save draft</Button>
    </div>
  );
}
