import { Button, Chip, NavigationMenu } from '@crazy-staff/ui';

export default function NavigationMenuCustomContent() {
  return (
    <NavigationMenu
      items={[
        {
          label: 'Latest build',
          content: (
            <div className="flex w-full flex-col gap-3 p-2 sm:w-80">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Version 0.9</span>
                <Chip size="sm">new</Chip>
              </div>
              <p className="text-sm text-muted">Adds teleports to every camp and fixes the arena crash.</p>
              <Button size="sm" variant="soft" className="self-start">
                Download
              </Button>
            </div>
          ),
        },
        {
          label: 'Status',
          content: (
            <ul className="flex w-full flex-col gap-2 p-2 text-sm sm:w-64">
              <li className="flex justify-between"><span>God mode</span><span className="text-success">verified</span></li>
              <li className="flex justify-between"><span>Polymorph</span><span className="text-warning">works badly</span></li>
              <li className="flex justify-between"><span>Meteors</span><span className="text-danger">crashes</span></li>
            </ul>
          ),
        },
        { label: 'Docs', href: '#docs', active: true },
      ]}
    />
  );
}
