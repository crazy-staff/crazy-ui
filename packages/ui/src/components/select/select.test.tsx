import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './select';

const items = [
  { value: 'g1', label: 'Gothic 1' },
  { value: 'g2', label: 'Gothic 2' },
];

describe('Select', () => {
  it('shows the placeholder, then the picked label', async () => {
    const onValueChange = vi.fn();
    render(<Select aria-label="Game" items={items} placeholder="Pick a game" onValueChange={onValueChange} />);
    expect(screen.getByText('Pick a game')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('combobox', { name: 'Game' }));
    await userEvent.click(await screen.findByRole('option', { name: 'Gothic 2' }));
    expect(onValueChange).toHaveBeenCalledWith('g2');
    expect(screen.getByRole('combobox', { name: 'Game' })).toHaveTextContent('Gothic 2');
  });

  it('sizes the trigger', () => {
    render(<Select aria-label="Game" size="sm" items={items} />);
    expect(screen.getByRole('combobox', { name: 'Game' })).toHaveClass('h-control-sm');
  });
});
