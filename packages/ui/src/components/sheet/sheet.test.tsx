import { render, screen } from '@testing-library/react';
import { Sheet } from './sheet';

describe('Sheet', () => {
  it('renders on the right by default', async () => {
    render(<Sheet defaultOpen title="Filters">body</Sheet>);
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveClass('right-2');
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('can open from the left', async () => {
    render(<Sheet defaultOpen side="left" title="Menu" />);
    expect(await screen.findByRole('dialog')).toHaveClass('left-2');
  });
});
