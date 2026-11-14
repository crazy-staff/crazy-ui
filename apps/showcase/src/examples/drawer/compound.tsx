import { Avatar, Button, Drawer } from '@crazy-staff/ui';

export default function DrawerCompound() {
  return (
    <Drawer.Root>
      <Drawer.Trigger render={<Button variant="outline" />}>Tester profile</Drawer.Trigger>
      <Drawer.Content showHandle={false}>
        <div className="flex items-center gap-3">
          <Avatar name="Marta Nowak" />
          <div>
            <Drawer.Title>Marta Nowak</Drawer.Title>
            <Drawer.Description>Veteran tester · 48 reports</Drawer.Description>
          </div>
        </div>
        <Drawer.Body className="grid grid-cols-3 gap-2 text-center">
          {[
            ['48', 'reports'],
            ['31', 'verified'],
            ['6', 'crashes found'],
          ].map(([value, label]) => (
            <div key={label} className="squircle rounded-item bg-surface-2 px-2 py-3">
              <div className="font-heading text-lg font-semibold">{value}</div>
              <div className="text-xs text-muted">{label}</div>
            </div>
          ))}
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close render={<Button variant="outline" />}>Close</Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
}
