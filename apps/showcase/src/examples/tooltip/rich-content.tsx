import { Button, Kbd, KbdGroup, Tooltip } from '@crazy-staff/ui';
import { Save } from 'lucide-react';

export default function TooltipRichContent() {
  return (
    <Tooltip
      content={
        <span className="flex items-center gap-2">
          Quick save
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </span>
      }
    >
      <Button variant="soft">
        <Save /> Save
      </Button>
    </Tooltip>
  );
}
