import { Button, Chart } from '@crazy-staff/ui';

export default function ChartEmpty() {
  return (
    <Chart
      className="w-full max-w-2xl"
      type="bar"
      data={[]}
      x="week"
      height={220}
      series={[{ key: 'reports', label: 'Crash reports' }]}
      empty={{
        title: 'No crash reports yet',
        description: 'Reports from testers on build 0.9.2 show up here.',
        action: <Button size="sm" variant="outline">Invite testers</Button>,
      }}
      ariaLabel="Crash reports per week"
    />
  );
}
