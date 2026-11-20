import { render, screen, waitFor } from '@testing-library/react';
import { expectNoA11yViolations, resetViewport, setViewport } from '../../test/utils';
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

describe('DropdownMenu on a phone', () => {
  beforeEach(() => setViewport(390));
  afterEach(() => resetViewport());

  it('opens as a drawer titled by the menu, a pick closes it and focus returns to the trigger', async () => {
    const onPick = vi.fn();
    render(
      <DropdownMenu
        title="Language"
        trigger={<button type="button">Language</button>}
        items={[
          { label: 'English', checked: true, onClick: () => onPick('en') },
          { label: 'Polski', checked: false, onClick: () => onPick('pl') },
        ]}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Language' });
    await userEvent.click(trigger);
    const drawer = await screen.findByRole('dialog', { name: 'Language' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    const english = screen.getByRole('button', { name: 'English' });
    expect(english).toHaveAttribute('aria-pressed', 'true');
    expect(english.className).toContain('min-h-12');
    expect(english.className).toContain('bg-accent-soft');
    await expectNoA11yViolations();
    await userEvent.click(screen.getByRole('button', { name: 'Polski' }));
    expect(onPick).toHaveBeenCalledWith('pl');
    await waitFor(() => expect(drawer).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('keeps the compound parts working: radio group, checkbox, submenu inline', async () => {
    const onValue = vi.fn();
    render(
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>View</DropdownMenu.Trigger>
        <DropdownMenu.Content title="View">
          <DropdownMenu.CheckboxItem defaultChecked>Show grid</DropdownMenu.CheckboxItem>
          <DropdownMenu.Separator />
          <DropdownMenu.RadioGroup defaultValue="list" onValueChange={onValue}>
            <DropdownMenu.RadioItem value="list">List</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="cards">Cards</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Sort</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Newest</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Item>
            Rename <DropdownMenu.Shortcut>F2</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'View' }));
    await screen.findByRole('dialog', { name: 'View' });
    // the checkbox stays open on toggle
    const grid = screen.getByRole('button', { name: 'Show grid' });
    expect(grid).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(grid);
    expect(grid).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Sort')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Newest' })).toBeInTheDocument();
    expect(screen.queryByText('F2')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Cards' }));
    expect(onValue).toHaveBeenCalledWith('cards', expect.anything());
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('stays a menu with mobile="none"', async () => {
    render(<DropdownMenu mobile="none" title="Options" trigger={<button type="button">Options</button>} items={[{ label: 'Rename' }]} />);
    await userEvent.click(screen.getByRole('button', { name: 'Options' }));
    expect(await screen.findByRole('menu', { name: 'Options' })).toBeInTheDocument();
  });
});

describe('DropdownMenu picked options', () => {
  it('tints the checked item and puts the check at the end, with the title on top', async () => {
    render(
      <DropdownMenu
        title="Theme"
        showTitle
        trigger={<button type="button">Theme</button>}
        items={[
          { label: 'Light', checked: false },
          { label: 'Dark', checked: true },
        ]}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Theme' }));
    const dark = await screen.findByRole('menuitemradio', { name: 'Dark' });
    expect(dark).toHaveAttribute('aria-checked', 'true');
    expect(dark).toHaveAttribute('data-checked');
    expect(dark.lastElementChild?.querySelector('svg')).not.toBeNull();
    expect(screen.getByRole('menu', { name: 'Theme' })).toBeInTheDocument();
    await expectNoA11yViolations();
  });
});
