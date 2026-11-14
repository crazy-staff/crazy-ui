import { Breadcrumb } from '@crazy-staff/ui';
import { Slash } from 'lucide-react';

export default function BreadcrumbCustomSeparator() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#hub">crazy-hub</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <Slash />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#ideas">Ideas</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <Slash />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page>Save teleport markers</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
