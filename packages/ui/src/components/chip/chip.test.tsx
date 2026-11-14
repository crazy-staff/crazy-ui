import { render, screen } from '@testing-library/react';
import { Chip } from './chip';

describe('Chip', () => {
  it('renders its label with the chip radius', () => {
    render(<Chip>verified</Chip>);
    expect(screen.getByText('verified')).toHaveClass('rounded-chip', 'squircle');
  });

  it('switches variants', () => {
    render(<Chip variant="outline">beta</Chip>);
    expect(screen.getByText('beta')).toHaveClass('border');
  });

  it('has status variants tinted from the status tokens', () => {
    render(<Chip variant="warning">works badly</Chip>);
    expect(screen.getByText('works badly')).toHaveClass('text-warning', 'bg-warning/12');
  });
});
