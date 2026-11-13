import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './accordion';

describe('Accordion', () => {
  it('opens a section on click', async () => {
    render(<Accordion items={[{ value: 'a', title: 'Install', content: 'Copy the files.' }]} />);
    const trigger = screen.getByRole('button', { name: 'Install' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Copy the files.')).toBeInTheDocument();
  });
});
