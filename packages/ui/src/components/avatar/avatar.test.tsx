import { render, screen } from '@testing-library/react';
import { Avatar, initials } from './avatar';

describe('Avatar', () => {
  it('derives initials', () => {
    expect(initials('Dawid Seipold')).toBe('DS');
    expect(initials('diego')).toBe('D');
  });

  it('shows the initials when there is no image', () => {
    render(<Avatar name="Dawid Seipold" size="lg" />);
    expect(screen.getByText('DS')).toBeInTheDocument();
  });
});
