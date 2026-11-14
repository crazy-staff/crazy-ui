import { render, screen } from '@testing-library/react';
import { Carousel } from './carousel';

class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= RO as unknown as typeof ResizeObserver;
window.matchMedia ??= ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent: () => false,
})) as unknown as typeof window.matchMedia;

describe('Carousel', () => {
  it('renders a carousel region with labelled slides and controls', () => {
    render(<Carousel aria-label="Screenshots" slides={['God mode', 'Teleport', 'Meteors']} />);
    const region = screen.getByRole('region', { name: 'Screenshots' });
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    expect(screen.getAllByRole('group', { name: /of 3/ })).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument();
  });

  it('can hide arrows and dots', () => {
    render(<Carousel arrows={false} dots={false} slides={['One', 'Two']} />);
    expect(screen.queryByRole('button', { name: 'Next slide' })).not.toBeInTheDocument();
  });
});
