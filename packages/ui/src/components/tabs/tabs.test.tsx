import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './tabs';

const items = [
  { value: 'a', label: 'Alpha', content: 'Panel A' },
  { value: 'b', label: 'Beta', content: 'Panel B' },
];

describe('Tabs', () => {
  it('shows the first panel and switches on click', async () => {
    render(<Tabs items={items} />);
    expect(screen.getByText('Panel A')).toBeVisible();
    await userEvent.click(screen.getByRole('tab', { name: 'Beta' }));
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel B')).toBeVisible();
  });

  it('supports the line variant', () => {
    render(<Tabs items={items} variant="line" />);
    expect(screen.getByRole('tablist')).toHaveClass('border-b');
  });
});
