import { Chip, createDataTableColumns, DataTable, Button, useDataTable } from '@crazy-staff/ui';

interface Post {
  id: string;
  title: string;
  status: 'planned' | 'in progress' | 'released' | 'open';
  votes: number;
  author: string;
}

const posts: Post[] = [
  { id: '1', title: 'Teleport menu', status: 'released', votes: 128, author: 'Diego' },
  { id: '2', title: 'Save editor', status: 'planned', votes: 96, author: 'Milten' },
  { id: '3', title: 'Free camera', status: 'in progress', votes: 74, author: 'Lester' },
  { id: '4', title: 'Item spawner', status: 'released', votes: 61, author: 'Gorn' },
  { id: '5', title: 'Weather control', status: 'open', votes: 40, author: 'Lares' },
  { id: '6', title: 'Speed hack', status: 'open', votes: 33, author: 'Diego' },
  { id: '7', title: 'Day and night switch', status: 'planned', votes: 27, author: 'Cor Angar' },
  { id: '8', title: 'Monster spawner', status: 'in progress', votes: 22, author: 'Milten' },
];

const tone = { released: 'success', planned: 'soft', 'in progress': 'warning', open: 'neutral' } as const;

const col = createDataTableColumns<Post>();
const columns = col.columns([
  col.accessor('title', { header: 'Idea', cell: (info) => <span className="font-medium">{info.getValue()}</span> }),
  col.accessor('status', { header: 'Status', meta: { width: 150 }, cell: (info) => <Chip variant={tone[info.getValue()]}>{info.getValue()}</Chip> }),
  col.accessor('votes', { header: 'Votes', meta: { width: 104 } }),
  col.accessor('author', { header: 'Author', meta: { width: 150 } }),
]);

export default function DataTableCompound() {
  const table = useDataTable({ columns, data: posts, getRowId: (p) => p.id, selectable: true, pageSize: 4 });
  const selected = table.getSelectedRowModel().rows.length;
  return (
    <DataTable.Root table={table} className="w-full">
      <DataTable.Toolbar>
        <DataTable.Search placeholder="Search…" />
        {selected > 0 && (
          <Button size="sm" variant="soft">
            Merge {selected}
          </Button>
        )}
        <DataTable.ColumnToggle />
      </DataTable.Toolbar>
      <DataTable.Content onRowClick={(row) => console.log(row.id)} />
      <DataTable.Footer>
        <DataTable.Count />
        <DataTable.Pagination />
      </DataTable.Footer>
    </DataTable.Root>
  );
}
