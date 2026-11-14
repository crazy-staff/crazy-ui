import { Breadcrumb } from '@crazy-staff/ui';
import { BookOpen, House } from 'lucide-react';

export default function BreadcrumbIcons() {
  return (
    <Breadcrumb
      items={[
        {
          label: (
            <span className="inline-flex items-center gap-1.5">
              <House className="size-3.5" /> Home
            </span>
          ),
          href: '#home',
        },
        {
          label: (
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="size-3.5" /> Docs
            </span>
          ),
          href: '#docs',
        },
        { label: 'Installation' },
      ]}
    />
  );
}
