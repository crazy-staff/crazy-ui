import { render, screen } from '@testing-library/react';
import { Table } from './table';

describe('Table', () => {
  it('renders columns and rows', () => {
    render(
      <Table
        columns={[
          { key: 'name', header: 'Feature' },
          { key: 'status', header: 'Status' },
        ]}
        rows={[{ name: 'God mode', status: 'verified' }]}
      />,
    );
    expect(screen.getByRole('columnheader', { name: 'Feature' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'God mode' })).toBeInTheDocument();
  });

  it('switches to a fixed layout with a <col> per column when a column has a width', () => {
    const { container } = render(
      <Table
        columns={[
          { key: 'name', header: 'Feature' },
          { key: 'tests', header: 'Tests', width: 88 },
        ]}
        rows={[{ name: 'God mode', tests: 14 }]}
      />,
    );
    expect(screen.getByRole('table')).toHaveClass('table-fixed');
    const cols = container.querySelectorAll('col');
    expect(cols).toHaveLength(2);
    expect(cols[1]).toHaveStyle({ width: '88px' });
  });
});
