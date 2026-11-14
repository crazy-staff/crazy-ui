import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Collapsible } from './collapsible';

describe('Collapsible', () => {
  it('toggles its panel', async () => {
    render(<Collapsible title="Advanced">Hidden options</Collapsible>);
    const trigger = screen.getByRole('button', { name: 'Advanced' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Hidden options')).toBeInTheDocument();
  });
});
