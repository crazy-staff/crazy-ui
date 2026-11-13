import { render, screen } from '@testing-library/react';
import { Separator } from './separator';

describe('Separator', () => {
  it('renders a separator with orientation', () => {
    render(<Separator orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders a label', () => {
    render(<Separator label="or" />);
    expect(screen.getByText('or')).toBeInTheDocument();
  });
});
