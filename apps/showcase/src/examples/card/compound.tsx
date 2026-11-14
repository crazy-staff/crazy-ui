import { Button, Card, Chip } from '@crazy-staff/ui';

export default function CardCompound() {
  return (
    <Card.Root className="w-full max-w-sm">
      <Card.Header>
        <div className="flex items-center justify-between gap-3">
          <Card.Title>Teleport</Card.Title>
          <Chip size="sm" variant="success">
            verified
          </Chip>
        </div>
        <Card.Description>Jump to any marker on the map of the Colony.</Card.Description>
      </Card.Header>
      <Card.Body className="text-sm">12 markers saved · last used in the Old Camp</Card.Body>
      <Card.Footer>
        <Button size="sm" variant="outline">
          Markers
        </Button>
        <Button size="sm">Teleport</Button>
      </Card.Footer>
    </Card.Root>
  );
}
