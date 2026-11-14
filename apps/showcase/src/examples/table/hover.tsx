import { Table } from '@crazy-staff/ui';

export default function TableHover() {
  return (
    <Table
      hover
      className="min-w-md"
      columns={[
        { key: 'title', header: 'Idea', className: 'font-medium' },
        { key: 'author', header: 'Author', className: 'text-muted' },
        { key: 'votes', header: 'Votes', className: 'text-end tabular-nums' },
      ]}
      rows={[
        { title: 'Save teleport markers between sessions', author: 'Diego', votes: 128 },
        { title: 'Hotkey to toggle god mode', author: 'Milten', votes: 96 },
        { title: 'Free camera for screenshots', author: 'Gorn', votes: 71 },
        { title: 'Russian translation of the menu', author: 'Lester', votes: 44 },
      ]}
    />
  );
}
