import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './popover';

describe('Popover', () => {
  it('opens on trigger click and shows title and content', async () => {
    render(
      <Popover trigger={<button type="button">Filters</button>} title="Filters" description="Narrow the list">
        body
      </Popover>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Filters' }));
    expect(await screen.findByText('Narrow the list')).toBeInTheDocument();
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('uses the popup surface', async () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>open</Popover.Trigger>
        <Popover.Content data-testid="popup">x</Popover.Content>
      </Popover.Root>,
    );
    expect(await screen.findByTestId('popup')).toHaveClass('bg-popover', 'rounded-control', 'squircle');
  });
});
