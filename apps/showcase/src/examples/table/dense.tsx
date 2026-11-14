import { Table } from '@crazy-staff/ui';

export default function TableDense() {
  return (
    <Table
      dense
      className="min-w-sm"
      columns={[
        { key: 'attribute', header: 'Attribute' },
        { key: 'base', header: 'Base', className: 'text-end tabular-nums' },
        { key: 'trainer', header: 'With trainer', className: 'text-end tabular-nums' },
      ]}
      rows={[
        { attribute: 'Strength', base: 45, trainer: 100 },
        { attribute: 'Dexterity', base: 30, trainer: 100 },
        { attribute: 'Mana', base: 20, trainer: '∞' },
        { attribute: 'Hit points', base: 160, trainer: '∞' },
        { attribute: 'Learning points', base: 5, trainer: 200 },
      ]}
    />
  );
}
