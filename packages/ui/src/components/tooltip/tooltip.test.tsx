import { render, screen } from '@testing-library/react';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('shows its content when open', async () => {
    render(
      <Tooltip content="Copy link" defaultOpen>
        <button type="button">Copy</button>
      </Tooltip>,
    );
    expect(await screen.findByText('Copy link')).toBeInTheDocument();
  });

  it('renders the child as the trigger', () => {
    render(
      <Tooltip content="hint">
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.queryByText('hint')).not.toBeInTheDocument();
  });

  it('uses the small-control radius, not the chip one', async () => {
    render(
      <Tooltip content="Teleport to the Old Camp" defaultOpen>
        <button type="button">Teleport</button>
      </Tooltip>,
    );
    const popup = await screen.findByText('Teleport to the Old Camp');
    expect(popup).toHaveClass('rounded-control-sm', 'squircle', 'bg-popover', 'border-border');
    expect(popup).not.toHaveClass('rounded-chip');
  });
});
