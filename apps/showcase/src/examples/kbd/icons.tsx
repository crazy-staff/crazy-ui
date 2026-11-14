import { Kbd, KbdGroup } from '@crazy-staff/ui';
import { ArrowBigUp, ArrowUp, Command, CornerDownLeft } from 'lucide-react';

export default function KbdIcons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <KbdGroup>
        <Kbd aria-label="Command">
          <Command />
        </Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd aria-label="Shift">
          <ArrowBigUp />
        </Kbd>
        <Kbd aria-label="Arrow up">
          <ArrowUp />
        </Kbd>
      </KbdGroup>
      <Kbd aria-label="Enter">
        <CornerDownLeft />
      </Kbd>
    </div>
  );
}
