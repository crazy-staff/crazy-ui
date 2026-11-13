import { render, screen } from '@testing-library/react';
import { Progress } from './progress';

describe('Progress', () => {
  it('exposes the value to assistive tech', () => {
    render(<Progress value={42} label="Downloading" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '42');
    expect(screen.getByText('Downloading')).toBeInTheDocument();
  });
});
