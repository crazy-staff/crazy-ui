import { Button, ButtonGroup } from '@crazy-staff/ui';
import { Minus, Plus } from 'lucide-react';

export default function ButtonGroupDefault() {
  return (
    <ButtonGroup aria-label="Map zoom">
      <Button variant="outline" size="icon" aria-label="Zoom out">
        <Minus />
      </Button>
      <Button variant="outline">100%</Button>
      <Button variant="outline" size="icon" aria-label="Zoom in">
        <Plus />
      </Button>
    </ButtonGroup>
  );
}
