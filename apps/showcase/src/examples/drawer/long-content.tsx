import { Button, Drawer } from '@crazy-staff/ui';

const builds = Array.from({ length: 14 }, (_, i) => `0.${14 - i}`);

export default function DrawerLongContent() {
  return (
    <Drawer trigger={<Button variant="outline">All builds</Button>} title="All builds" description="Scroll inside the drawer.">
      <ul className="flex flex-col divide-y divide-border">
        {builds.map((b) => (
          <li key={b} className="flex items-center justify-between py-3">
            Build {b}
            <span className="text-muted">Gothic 1</span>
          </li>
        ))}
      </ul>
    </Drawer>
  );
}
