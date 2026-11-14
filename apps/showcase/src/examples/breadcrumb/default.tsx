import { Breadcrumb } from '@crazy-staff/ui';

export default function BreadcrumbDefault() {
  return (
    <Breadcrumb
      items={[
        { label: 'Gothic 1', href: '#gothic-1' },
        { label: 'Character', href: '#character' },
        { label: 'God mode' },
      ]}
    />
  );
}
