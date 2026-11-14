import { Table } from '@crazy-staff/ui';

export default function TableCaption() {
  return (
    <Table
      className="min-w-md"
      caption="Test results of build 0.9, reported by five testers."
      columns={[
        { key: 'tester', header: 'Tester', className: 'font-medium' },
        { key: 'reports', header: 'Reports', className: 'text-end tabular-nums' },
        { key: 'verified', header: 'Verified', className: 'text-end tabular-nums' },
      ]}
      rows={[
        { tester: 'Diego', reports: 12, verified: 10 },
        { tester: 'Milten', reports: 9, verified: 9 },
        { tester: 'Gorn', reports: 7, verified: 5 },
      ]}
    />
  );
}
