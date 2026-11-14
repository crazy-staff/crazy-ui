import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Command, type CommandGroupData, highlightParts } from './command';

const make = (onGod = vi.fn(), onTeleport = vi.fn()): CommandGroupData[] => [
  {
    label: 'Player',
    items: [
      { value: 'god', label: 'God mode', shortcut: 'Ctrl+G', keywords: ['invincible'], onSelect: onGod },
      { value: 'mana', label: 'Infinite mana' },
    ],
  },
  { label: 'World', items: [{ value: 'tp', label: 'Teleport', onSelect: onTeleport }] },
];

describe('Command', () => {
  it('lists grouped commands with shortcuts', () => {
    render(<Command groups={make()} />);
    expect(screen.getByText('Player')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /God mode/ })).toBeInTheDocument();
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
  });

  it('filters by label and keywords and shows the empty state', async () => {
    render(<Command groups={make()} />);
    const input = screen.getByRole('combobox', { name: 'Search commands' });
    await userEvent.type(input, 'invinc');
    expect(screen.getByRole('option', { name: /God mode/ })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /Teleport/ })).not.toBeInTheDocument();
    await userEvent.type(input, 'xyz');
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('runs the highlighted item with Enter and keeps the search text', async () => {
    const onTeleport = vi.fn();
    render(<Command groups={make(vi.fn(), onTeleport)} />);
    const input = screen.getByRole('combobox', { name: 'Search commands' });
    await userEvent.type(input, 'tele');
    await userEvent.keyboard('{Enter}');
    expect(onTeleport).toHaveBeenCalledOnce();
    expect(input).toHaveValue('tele');
  });

  it('closes the dialog after an item runs', async () => {
    const onGod = vi.fn();
    render(<Command.Dialog trigger={<button type="button">Open</button>} groups={make(onGod)} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(await screen.findByRole('dialog', { name: 'Command palette' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('option', { name: /God mode/ }));
    expect(onGod).toHaveBeenCalledOnce();
    await vi.waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('highlights matches of the typed text', async () => {
    const { container } = render(<Command groups={make()} />);
    await userEvent.type(screen.getByRole('combobox'), 'mana');
    expect(container.querySelector('mark')).toHaveTextContent('mana');
    expect(highlightParts('Infinite mana', 'MAN')).toEqual([
      { text: 'Infinite ', match: false },
      { text: 'man', match: true },
      { text: 'a', match: false },
    ]);
  });

  it('shows the loading state instead of results', () => {
    render(<Command groups={make()} loading loadingText="Searching posts…" />);
    expect(screen.getByRole('status')).toHaveTextContent('Searching posts…');
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });

  it('renders breadcrumbs and a jump item', () => {
    const rows = [{ id: 'j', label: 'Button' }];
    render(
      <Command.Root items={rows} filter={null}>
        <Command.Input aria-label="Search docs" />
        <Command.List>
          {(row: (typeof rows)[number]) => (
            <Command.JumpItem key={row.id} value={row}>
              {row.label}
            </Command.JumpItem>
          )}
        </Command.List>
        <Command.ItemBreadcrumbs items={['Components', 'Button']} />
      </Command.Root>,
    );
    expect(screen.getByRole('option', { name: /Jump to Button/ })).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
  });

  it('keeps the clear button in place and shows it only when a filter is set', async () => {
    function Demo() {
      const [v, setV] = React.useState('all');
      return (
        <Command.Filters canClear={v !== 'all'} onClear={() => setV('all')}>
          <Command.Filter
            label="Section"
            options={[
              { value: 'all', label: 'All' },
              { value: 'components', label: 'Components' },
            ]}
            value={v}
            onValueChange={setV}
          />
        </Command.Filters>
      );
    }
    render(<Demo />);
    const clear = screen.getByText('Clear filters').closest('button')!;
    expect(clear).toBeDisabled();
    expect(clear.className).toContain('invisible');
    await userEvent.click(screen.getByRole('button', { name: 'Section: All' }));
    await userEvent.click(await screen.findByRole('menuitemradio', { name: 'Components' }));
    const trigger = await screen.findByRole('button', { name: 'Section: Components' });
    expect(trigger).toBeInTheDocument();
    expect(clear).toBeEnabled();
    await userEvent.click(clear);
    expect(screen.getByRole('button', { name: 'Section: All' })).toBeInTheDocument();
  });
});
