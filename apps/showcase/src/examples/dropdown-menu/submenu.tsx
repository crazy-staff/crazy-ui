import { Button, DropdownMenu } from '@crazy-staff/ui';
import { MapPin, Plus } from 'lucide-react';

const places = {
  'Old Camp': ['Gate', 'Arena', 'Castle'],
  'New Camp': ['Rice fields', 'Water mages'],
  'Swamp camp': ['Temple', 'Alchemist'],
};

export default function DropdownMenuSubmenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>
        <MapPin /> Teleport
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {Object.entries(places).map(([camp, spots]) => (
          <DropdownMenu.Sub key={camp}>
            <DropdownMenu.SubTrigger>{camp}</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              {spots.map((spot) => (
                <DropdownMenu.Item key={spot}>{spot}</DropdownMenu.Item>
              ))}
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        ))}
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <Plus /> Save current spot
          <DropdownMenu.Shortcut>Ctrl M</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
