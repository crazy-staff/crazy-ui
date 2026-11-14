import { Toggle } from '@crazy-staff/ui';
import { ArrowBigUp } from 'lucide-react';
import { useState } from 'react';

export default function ToggleControlled() {
  const [voted, setVoted] = useState(false);
  return (
    <Toggle variant="outline" pressed={voted} onPressedChange={setVoted} aria-label="Upvote">
      <ArrowBigUp />
      <span className="tabular-nums">{128 + (voted ? 1 : 0)}</span>
    </Toggle>
  );
}
