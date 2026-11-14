import { render } from '@testing-library/react';
import { ProgressiveBlur } from './progressive-blur';

describe('ProgressiveBlur', () => {
  it('renders a hidden, non-interactive overlay with stacked layers', () => {
    const { container } = render(<ProgressiveBlur layers={5} className="rounded-b-card" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root).toHaveClass('pointer-events-none', 'bottom-0', 'rounded-b-card');
    expect(root.children).toHaveLength(5);
    expect(root.style.height).toBe('64px');
  });

  it('grows the blur towards the edge', () => {
    const { container } = render(<ProgressiveBlur side="left" size="30%" strength={12} layers={3} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('left-0');
    expect(root.style.width).toBe('30%');
    const layers = Array.from(root.children) as HTMLElement[];
    expect(layers.map((layer) => layer.style.backdropFilter)).toEqual(['blur(4px)', 'blur(8px)', 'blur(12px)']);
    // Each layer starts one step further in from the inner (right) edge and reaches the left edge.
    expect(layers.map((layer) => layer.style.right)).toEqual(['0%', '33.3333%', '66.6667%']);
  });

  it('adds a tint layer', () => {
    const { container } = render(<ProgressiveBlur layers={2} tint="var(--cui-surface)" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.children).toHaveLength(3);
    expect((root.lastElementChild as HTMLElement).style.backgroundImage).toContain('var(--cui-surface)');
  });
});
