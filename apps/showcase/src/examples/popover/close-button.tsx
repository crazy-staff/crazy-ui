import { Button, Popover } from '@crazy-staff/ui';
import { Bell } from 'lucide-react';

export default function PopoverCloseButton() {
  return (
    <Popover
      showClose
      align="end"
      trigger={
        <Button size="icon" variant="outline" aria-label="Notifications">
          <Bell />
        </Button>
      }
      title="Notifications"
    >
      <ul className="mt-3 flex flex-col gap-3 text-sm">
        <li>
          <span className="font-medium">Your idea was planned.</span>
          <span className="block text-muted">“Save teleport markers per save file”</span>
        </li>
        <li>
          <span className="font-medium">Build 0.9 is ready to test.</span>
          <span className="block text-muted">Grab it from the releases page.</span>
        </li>
      </ul>
    </Popover>
  );
}
