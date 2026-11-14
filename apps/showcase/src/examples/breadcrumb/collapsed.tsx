import { Breadcrumb, Button, DropdownMenu } from '@crazy-staff/ui';
import { Ellipsis } from 'lucide-react';

export default function BreadcrumbCollapsed() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#docs">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger render={<Button size="icon-sm" variant="ghost" aria-label="More pages" className="size-6" />}>
              <Ellipsis />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="start">
              <DropdownMenu.Item>Gothic 1</DropdownMenu.Item>
              <DropdownMenu.Item>Features</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#cheats">Cheats</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Infinite mana</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
