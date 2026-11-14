import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createDataTableColumns, DataTable } from './data-table';

interface Feature {
  id: string;
  name: string;
  votes: number;
}

const data: Feature[] = [
  { id: '1', name: 'Teleport menu', votes: 42 },
  { id: '2', name: 'God mode', votes: 128 },
  { id: '3', name: 'Infinite mana', votes: 7 },
];
const col = createDataTableColumns<Feature>();
const columns = col.columns([col.accessor('name', { header: 'Feature' }), col.accessor('votes', { header: 'Votes' })]);

const bodyRows = () => within(screen.getAllByRole('rowgroup')[1]!).getAllByRole('row');

describe('DataTable', () => {
  it('renders rows and sorts by a column', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} getRowId={(r) => r.id} />);
    expect(bodyRows()).toHaveLength(3);
    await user.click(screen.getByRole('button', { name: /Votes/ }));
    const header = screen.getByRole('columnheader', { name: /Votes/ });
    expect(header).toHaveAttribute('aria-sort');
    const first = bodyRows()[0]!;
    expect(first.textContent === 'Infinite mana7' || first.textContent === 'God mode128').toBe(true);
  });

  it('filters with the search field', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} getRowId={(r) => r.id} search="Search features" />);
    await user.type(screen.getByRole('textbox', { name: 'Search features' }), 'mana');
    expect(bodyRows()).toHaveLength(1);
    expect(screen.getByText('Infinite mana')).toBeInTheDocument();
  });

  it('selects rows with checkboxes', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} getRowId={(r) => r.id} selectable />);
    await user.click(screen.getByRole('checkbox', { name: 'Select all rows on this page' }));
    expect(screen.getByText('3 of 3 selected')).toBeInTheDocument();
  });

  it('pages through rows', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} getRowId={(r) => r.id} pageSize={2} />);
    expect(bodyRows()).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(bodyRows()).toHaveLength(1);
  });

  it('shows an empty row', () => {
    render(<DataTable columns={columns} data={[]} empty="No ideas yet." />);
    expect(screen.getByText('No ideas yet.')).toBeInTheDocument();
  });
});
