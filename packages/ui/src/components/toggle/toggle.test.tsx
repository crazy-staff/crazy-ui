import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from './toggle';

describe('Toggle', () => {
  it('flips aria-pressed', async () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    const t = screen.getByRole('button', { name: 'Bold' });
    expect(t).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(t);
    expect(t).toHaveAttribute('aria-pressed', 'true');
  });
});
