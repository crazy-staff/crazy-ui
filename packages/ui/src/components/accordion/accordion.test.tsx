import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './accordion';

const items = [
  { value: 'a', title: 'Install', content: 'Copy the files.' },
  { value: 'b', title: 'Update', content: 'Replace the DLL.' },
];

describe('Accordion', () => {
  it('opens a section on click', async () => {
    render(<Accordion items={items} />);
    const trigger = screen.getByRole('button', { name: 'Install' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Copy the files.')).toBeInTheDocument();
  });

  it('keeps one section open unless multiple is set', async () => {
    render(<Accordion items={items} defaultValue={['a']} />);
    await userEvent.click(screen.getByRole('button', { name: 'Update' }));
    expect(screen.getByRole('button', { name: 'Install' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Update' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('gives the trigger an inset rounded hover', () => {
    render(<Accordion items={items} variant="separated" />);
    expect(screen.getByRole('button', { name: 'Install' })).toHaveClass('rounded-item', 'hover:bg-hover', 'px-3.5');
  });
});
