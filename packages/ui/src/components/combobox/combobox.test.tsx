import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox } from './combobox';

const games = [
  { value: 'g1', label: 'Gothic 1' },
  { value: 'g2', label: 'Gothic 2' },
  { value: 'cm', label: 'Chronicles of Myrtana' },
];

describe('Combobox', () => {
  it('filters as you type, shows an empty state and picks an item', async () => {
    const onValueChange = vi.fn();
    render(<Combobox aria-label="Game" items={games} onValueChange={onValueChange} />);
    const input = screen.getByRole('combobox', { name: 'Game' });
    await userEvent.type(input, 'goth');
    expect(await screen.findByRole('option', { name: 'Gothic 1' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Chronicles of Myrtana' })).not.toBeInTheDocument();
    await userEvent.type(input, 'zzz');
    expect(await screen.findByText('No results.')).toBeInTheDocument();
    await userEvent.clear(input);
    await userEvent.type(input, 'chron');
    await userEvent.click(await screen.findByRole('option', { name: 'Chronicles of Myrtana' }));
    expect(onValueChange).toHaveBeenCalledWith('cm', expect.anything());
    expect(input).toHaveValue('Chronicles of Myrtana');
  });

  it('shows picked values as removable chips in multiple mode', async () => {
    const onValueChange = vi.fn();
    render(<Combobox multiple aria-label="Games" items={games} defaultValue={['g1']} onValueChange={onValueChange} />);
    expect(screen.getByText('Gothic 1')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Remove Gothic 1' }));
    expect(onValueChange).toHaveBeenLastCalledWith([], expect.anything());
    await userEvent.click(screen.getByRole('combobox', { name: 'Games' }));
    await userEvent.click(await screen.findByRole('option', { name: 'Gothic 2' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['g2'], expect.anything());
  });

  it('renders groups and plain string items', async () => {
    render(
      <Combobox
        aria-label="Feature"
        items={[
          { label: 'Player', items: [{ value: 'god', label: 'God mode' }] },
          { label: 'World', items: [{ value: 'time', label: 'Freeze time' }] },
        ]}
      />,
    );
    await userEvent.click(screen.getByRole('combobox', { name: 'Feature' }));
    expect(await screen.findByText('World')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Freeze time' })).toBeInTheDocument();
  });
});
