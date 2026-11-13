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
});
