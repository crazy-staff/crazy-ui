import { Table } from '@crazy-staff/ui';

const builds = [
  { version: '0.9', date: '10.11.2026', added: 4, fixed: 3 },
  { version: '0.8', date: '27.10.2026', added: 6, fixed: 2 },
  { version: '0.7', date: '12.10.2026', added: 11, fixed: 0 },
];

export default function TableCompound() {
  return (
    <Table.Root className="min-w-md">
      <Table.Header>
        <Table.Row>
          <Table.Head>Build</Table.Head>
          <Table.Head>Released</Table.Head>
          <Table.Head className="text-end">Features added</Table.Head>
          <Table.Head className="text-end">Bugs fixed</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {builds.map((b) => (
          <Table.Row key={b.version}>
            <Table.Cell className="font-medium">{b.version}</Table.Cell>
            <Table.Cell className="text-muted tabular-nums">{b.date}</Table.Cell>
            <Table.Cell className="text-end tabular-nums">{b.added}</Table.Cell>
            <Table.Cell className="text-end tabular-nums">{b.fixed}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={2}>Total</Table.Cell>
          <Table.Cell className="text-end tabular-nums">21</Table.Cell>
          <Table.Cell className="text-end tabular-nums">5</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
}
