import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('renders its children and is clickable', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    const btn = screen.getByRole('button', { name: 'Save' });
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('merges a caller className over the base styles', () => {
    render(<Button className="rounded-card">X</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded-card');
    expect(screen.getByRole('button')).not.toHaveClass('rounded-control');
  });

  it('uses a smaller radius for smaller sizes', () => {
    render(<Button size="sm">S</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded-control-sm', 'squircle');
  });

  it('does not fire when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        X
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
