import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlertDialog } from './alert-dialog';

describe('AlertDialog', () => {
  it('calls onAction and closes', async () => {
    const onAction = vi.fn();
    render(
      <AlertDialog
        trigger={<button type="button">Delete</button>}
        title="Delete kit?"
        actionLabel="Delete"
        tone="danger"
        onAction={onAction}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    const dialog = await screen.findByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    const action = screen.getAllByRole('button', { name: 'Delete' }).find((b) => dialog.contains(b))!;
    expect(action).toHaveClass('bg-danger');
    await userEvent.click(action);
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('has a cancel button', async () => {
    render(<AlertDialog defaultOpen title="Sure?" />);
    expect(await screen.findByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
});
