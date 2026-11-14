import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from './date-picker';

describe('DatePicker', () => {
  it('opens a calendar and shows the picked date in the trigger', async () => {
    const onValueChange = vi.fn();
    render(<DatePicker placeholder="Release date" onValueChange={onValueChange} name="release" />);
    const trigger = screen.getByRole('button', { name: 'Release date' });
    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole('button', { name: /Next month/ }));
    const grid = await screen.findAllByRole('grid');
    const target = grid[grid.length - 1]!.querySelector<HTMLButtonElement>('button[data-day$="-15"]')!;
    await userEvent.click(target);
    expect(onValueChange).toHaveBeenCalledOnce();
    const picked = onValueChange.mock.calls[0]![0] as Date;
    expect(picked.getDate()).toBe(15);
    expect(trigger).toHaveTextContent(new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(picked));
    expect(document.querySelector('input[name="release"]')).toHaveValue(
      `${picked.getFullYear()}-${String(picked.getMonth() + 1).padStart(2, '0')}-15`,
    );
  });

  it('formats a range and closes after the second click', async () => {
    const onValueChange = vi.fn();
    render(
      <DatePicker
        mode="range"
        defaultValue={{ from: new Date(2026, 10, 3) }}
        onValueChange={onValueChange}
        aria-label="Test window"
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Test window' });
    expect(trigger).toHaveTextContent('Nov 3, 2026 – …');
    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole('button', { name: /November 9, 2026/ }));
    expect(onValueChange).toHaveBeenLastCalledWith({ from: new Date(2026, 10, 3), to: new Date(2026, 10, 9) });
    expect(trigger).toHaveTextContent(/Nov 3\s*–\s*9, 2026/);
  });

  it('can be disabled', () => {
    render(<DatePicker disabled />);
    expect(screen.getByRole('button', { name: 'Pick a date' })).toBeDisabled();
  });
});
