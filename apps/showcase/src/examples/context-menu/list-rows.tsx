import { Chip, ContextMenu } from '@crazy-staff/ui';
import { CircleCheck, CircleX, Copy, TriangleAlert } from 'lucide-react';
import { useState } from 'react';

type Status = 'verified' | 'works badly' | 'crashes';
const variant = { verified: 'success', 'works badly': 'warning', crashes: 'danger' } as const;

export default function ContextMenuListRows() {
  const [features, setFeatures] = useState<Record<string, Status>>({
    'God mode': 'verified',
    Polymorph: 'works badly',
    'Meteor rain': 'crashes',
  });
  const mark = (name: string, status: Status) => () => setFeatures((f) => ({ ...f, [name]: status }));

  return (
    <ul className="flex w-full max-w-sm flex-col gap-1">
      {Object.entries(features).map(([name, status]) => (
        <li key={name}>
          <ContextMenu
            className="squircle flex items-center justify-between rounded-item px-3 py-2.5 text-sm transition-colors hover:bg-hover data-[popup-open]:bg-hover"
            items={[
              { type: 'label', label: `Mark “${name}” as` },
              { label: 'Verified', icon: <CircleCheck />, onClick: mark(name, 'verified') },
              { label: 'Works badly', icon: <TriangleAlert />, onClick: mark(name, 'works badly') },
              { label: 'Crashes', icon: <CircleX />, onClick: mark(name, 'crashes') },
              { type: 'separator' },
              { label: 'Copy name', icon: <Copy /> },
            ]}
          >
            {name}
            <Chip size="sm" variant={variant[status]}>
              {status}
            </Chip>
          </ContextMenu>
        </li>
      ))}
    </ul>
  );
}
