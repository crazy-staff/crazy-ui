import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Command, type CommandGroupData } from './command';

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
});
