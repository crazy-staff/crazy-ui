import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menubar } from './menubar';

describe('Menubar', () => {
  it('opens a menu and runs an item', async () => {
    const onSave = vi.fn();
    render(
      <Menubar
        menus={[
          { label: 'Profile', items: [{ label: 'Save', shortcut: 'Ctrl S', onClick: onSave }, { type: 'separator' }, { label: 'Reset', danger: true }] },
          { label: 'View', items: [{ label: 'Show FPS' }] },
        ]}
      />,
    );
    expect(screen.getByRole('menubar')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('menuitem', { name: 'Profile' }));
    await userEvent.click(await screen.findByRole('menuitem', { name: /Save/ }));
    expect(onSave).toHaveBeenCalledOnce();
  });

  it('supports the compound parts', async () => {
    render(
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>View</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.CheckboxItem defaultChecked>Show FPS</Menubar.CheckboxItem>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>,
    );
    await userEvent.click(screen.getByRole('menuitem', { name: 'View' }));
    expect(await screen.findByRole('menuitemcheckbox', { name: 'Show FPS' })).toHaveAttribute('aria-checked', 'true');
  });
});
