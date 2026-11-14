import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('is announced as loading', () => {
    render(<Spinner />);
    expect(screen.getByRole('status', { name: 'Loading' })).toHaveClass('animate-spin');
  });
});
