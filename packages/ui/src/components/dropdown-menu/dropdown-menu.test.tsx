import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu } from './dropdown-menu';

describe('DropdownMenu', () => {
  it('opens and runs an item action', async () => {
    const onRename = vi.fn();
    render(
      <DropdownMenu
        trigger={<button type="button">Options</button>}
        items={[
          { label: 'Rename', shortcut: 'F2', onClick: onRename },
          { type: 'separator' },
          { label: 'Delete', danger: true },
        ]}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Options' }));
    const rename = await screen.findByRole('menuitem', { name: /Rename/ });
    expect(screen.getByText('F2')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveClass('text-danger');
    await userEvent.click(rename);
    expect(onRename).toHaveBeenCalledOnce();
  });

  it('supports checkbox items', async () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.CheckboxItem defaultChecked>Show ESP</DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Root>,
    );
    expect(await screen.findByRole('menuitemcheckbox', { name: 'Show ESP' })).toHaveAttribute('aria-checked', 'true');
  });
});

describe('DropdownMenu labels', () => {
  it('renders a label entry inside a group without errors', async () => {
    const { render, screen } = await import('@testing-library/react');
    const userEvent = (await import('@testing-library/user-event')).default;
    const { DropdownMenu } = await import('./dropdown-menu');
    render(
      <DropdownMenu
        trigger={<button type="button">Open</button>}
        items={[{ type: 'label', label: 'Kit' }, { label: 'Rename' }, { type: 'separator' }, { label: 'Delete', danger: true }]}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(await screen.findByText('Kit')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toBeInTheDocument();
  });
});
