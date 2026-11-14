import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './tabs';

const items = [
  { value: 'a', label: 'Alpha', content: 'Panel A' },
  { value: 'b', label: 'Beta', content: 'Panel B' },
  { value: 'c', label: 'Gamma', content: 'Panel C', disabled: true },
];

describe('Tabs', () => {
  it('shows the first panel and switches on click', async () => {
    render(<Tabs items={items} />);
    expect(screen.getByText('Panel A')).toBeVisible();
    await userEvent.click(screen.getByRole('tab', { name: 'Beta' }));
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true');
    expect(await screen.findByText('Panel B')).toBeVisible();
  });

  it('moves with the arrow keys and skips disabled tabs', async () => {
    render(<Tabs items={items} />);
    await userEvent.tab();
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Gamma' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('uses the soft accent by default and a neutral fill without it', () => {
    const { unmount } = render(<Tabs items={items} />);
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveClass('data-[active]:text-accent-soft-foreground');
    unmount();
    render(<Tabs items={items} accent={false} />);
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveClass('data-[active]:text-foreground');
  });

  it('supports sizes and the line variant', () => {
    render(<Tabs items={items} variant="line" size="sm" />);
    expect(screen.getByRole('tablist')).toHaveClass('border-b');
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveClass('text-xs');
  });

  it('builds from compound parts', () => {
    render(
      <Tabs.Root defaultValue="b">
        <Tabs.List>
          <Tabs.Tab value="a">One</Tabs.Tab>
          <Tabs.Tab value="b">Two</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a">First</Tabs.Panel>
        <Tabs.Panel value="b">Second</Tabs.Panel>
      </Tabs.Root>,
    );
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Second')).toBeVisible();
  });
});
