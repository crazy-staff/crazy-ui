import { Button, DropdownMenu } from '@crazy-staff/ui';
import { BookOpen, ChevronDown, Download, Newspaper } from 'lucide-react';

export default function DropdownMenuOpenOnHover() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger openOnHover delay={100} render={<Button variant="ghost" />}>
        Trainer <ChevronDown />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <Download /> Download
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <BookOpen /> Install guide
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Newspaper /> Changelog
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
