import { Table } from '@crazy-staff/ui';

export default function TableDefault() {
  return (
    <Table
      className="min-w-md"
      columns={[
        { key: 'name', header: 'Feature', className: 'font-medium' },
        { key: 'area', header: 'Area' },
        { key: 'hotkey', header: 'Hotkey', className: 'font-mono text-xs' },
      ]}
      rows={[
        { name: 'God mode', area: 'Character', hotkey: 'F2' },
        { name: 'Infinite mana', area: 'Character', hotkey: 'F3' },
        { name: 'Teleport', area: 'World', hotkey: 'F6' },
        { name: 'Polymorph', area: 'Fun', hotkey: 'F9' },
      ]}
    />
  );
}
