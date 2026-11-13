import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './dialog';

describe('Dialog', () => {
  it('opens from the trigger and closes with the close button', async () => {
    render(
      <Dialog trigger={<button type="button">Edit</button>} title="Edit kit" description="Change the name">
        form
      </Dialog>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Edit kit')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    await vi.waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('applies the size variant', async () => {
    render(<Dialog defaultOpen title="Big" size="lg" />);
    expect(await screen.findByRole('dialog')).toHaveClass('max-w-2xl', 'rounded-card');
  });
});
