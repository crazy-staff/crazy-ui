import { Avatar, Button, DropdownMenu } from '@crazy-staff/ui';
import { Bell, LogOut, Settings, User } from 'lucide-react';

export default function DropdownMenuAccount() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger render={<Button variant="ghost" className="gap-2.5 ps-1.5" />}>
        <Avatar size="sm" name="Dawid" />
        Dawid
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="min-w-56">
        <div className="px-2.5 py-2">
          <div className="text-sm font-medium">Dawid</div>
          <div className="text-xs text-muted">Project lead · admin</div>
        </div>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <User /> Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Bell /> Notifications
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Settings /> Settings
          <DropdownMenu.Shortcut>Ctrl ,</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item danger>
          <LogOut /> Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
