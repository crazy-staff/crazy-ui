import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './switch';

describe('Switch', () => {
  it('toggles checked state on click', async () => {
    render(<Switch aria-label="wifi" />);
    const sw = screen.getByRole('switch', { name: 'wifi' });
    expect(sw).not.toBeChecked();
    await userEvent.click(sw);
    expect(sw).toBeChecked();
  });

  it('respects classNames slot override', () => {
    render(<Switch aria-label="wifi" classNames={{ root: 'rounded-card' }} />);
    expect(screen.getByRole('switch', { name: 'wifi' })).toHaveClass('rounded-card');
  });

  it('toggles from its label row', async () => {
    render(<Switch label="God mode" description="Ignore all damage." />);
    await userEvent.click(screen.getByText('God mode'));
    expect(screen.getByRole('switch')).toBeChecked();
    expect(screen.getByText('Ignore all damage.')).toBeInTheDocument();
  });
});
