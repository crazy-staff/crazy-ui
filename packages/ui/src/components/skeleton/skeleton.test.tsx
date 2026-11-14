import { render } from '@testing-library/react';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders one bar by default, hidden from assistive tech', () => {
    const { container } = render(<Skeleton className="w-40" />);
    const el = container.firstElementChild!;
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el).toHaveClass('w-40', 'squircle');
  });

  it('renders several lines', () => {
    const { container } = render(<Skeleton lines={3} />);
    expect(container.firstElementChild!.children).toHaveLength(3);
  });
});
