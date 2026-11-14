import { Chip, Table } from '@crazy-staff/ui';

type Status = 'verified' | 'works badly' | 'crashes' | 'new';
const tone = { verified: 'success', 'works badly': 'warning', crashes: 'danger', new: 'soft' } as const;

const features: { name: string; area: string; status: Status; tests: number }[] = [
  { name: 'God mode', area: 'Character', status: 'verified', tests: 14 },
  { name: 'Infinite mana', area: 'Character', status: 'verified', tests: 9 },
  { name: 'Polymorph', area: 'Fun', status: 'works badly', tests: 6 },
  { name: 'Meteors', area: 'Fun', status: 'crashes', tests: 4 },
  { name: 'Teleport', area: 'World', status: 'new', tests: 0 },
];

export default function TableCustomCells() {
  return (
    <Table
      className="min-w-md"
      rowKey={(r) => r.name}
      columns={[
        { key: 'name', header: 'Feature', className: 'font-medium' },
        { key: 'area', header: 'Area', width: 130, className: 'text-muted' },
        {
          key: 'status',
          header: 'Status',
          width: 140,
          cell: (r) => (
            <Chip size="sm" variant={tone[r.status]}>
              {r.status}
            </Chip>
          ),
        },
        { key: 'tests', header: 'Tests', width: 88, className: 'text-end' },
      ]}
      rows={features}
    />
  );
}
