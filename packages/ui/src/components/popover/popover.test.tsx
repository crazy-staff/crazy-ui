import { render, screen, waitFor } from '@testing-library/react';
import { expectNoA11yViolations, resetViewport, setViewport } from '../../test/utils';
import { Button } from '../button/button';
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

describe('Popover on a phone', () => {
  beforeEach(() => setViewport(390));
  afterEach(() => resetViewport());

  it('opens the same content in a drawer with touch-size controls; closing returns focus', async () => {
    render(
      <Popover trigger={<button type="button">Filters</button>} title="Filters">
        <Button>Apply</Button>
        <Popover.Close>Done</Popover.Close>
      </Popover>,
    );
    const trigger = screen.getByRole('button', { name: 'Filters' });
    await userEvent.click(trigger);
    const drawer = await screen.findByRole('dialog', { name: 'Filters' });
    expect(screen.getByRole('button', { name: 'Apply' }).className).toContain('h-control-lg');
    await expectNoA11yViolations();
    await userEvent.click(screen.getByRole('button', { name: 'Done' }));
    await waitFor(() => expect(drawer).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('stays a popover with mobile="none"', async () => {
    render(
      <Popover mobile="none" trigger={<button type="button">Filters</button>} title="Filters">
        <Button>Apply</Button>
      </Popover>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Filters' }));
    expect((await screen.findByRole('button', { name: 'Apply' })).className).not.toContain('h-control-lg');
  });
});
