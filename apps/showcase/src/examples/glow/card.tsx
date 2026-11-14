import { Button, Card } from '@crazy-staff/ui';

export default function GlowCard() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <Card
        className="glow"
        title="Build 0.9.2"
        description="The current release: teleport presets and a faster menu."
        footer={<Button size="sm" glow>Download</Button>}
      />
      <Card
        title="Build 0.9.1"
        description="Previous release, kept for testers on older saves."
        footer={<Button size="sm" variant="outline">Download</Button>}
      />
    </div>
  );
}
