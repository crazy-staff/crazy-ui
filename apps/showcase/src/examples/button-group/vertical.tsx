import { Button, ButtonGroup } from '@crazy-staff/ui';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';

export default function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Vote">
      <Button variant="outline" size="icon" aria-label="Upvote">
        <ArrowBigUp />
      </Button>
      <Button variant="outline" size="icon" aria-label="Downvote">
        <ArrowBigDown />
      </Button>
    </ButtonGroup>
  );
}
