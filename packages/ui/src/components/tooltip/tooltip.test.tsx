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
});
