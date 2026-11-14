import { Button, Card } from '@crazy-staff/ui';

export default function CardDefault() {
  return (
    <Card
      className="w-full max-w-sm"
      title="Infinite mana"
      description="Keeps your mana pool full, so spells never run dry."
      footer={<Button size="sm">Enable</Button>}
    >
      <p className="text-sm text-muted">Works in every chapter. Turn it off before saving a hardcore run.</p>
    </Card>
  );
}
