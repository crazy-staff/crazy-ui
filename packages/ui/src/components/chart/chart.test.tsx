import { render, screen } from '@testing-library/react';
import { Chart, chartColor } from './chart';

class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= RO as unknown as typeof ResizeObserver;

const data = [
  { build: '0.7', votes: 120, ideas: 14 },
  { build: '0.8', votes: 180, ideas: 22 },
  { build: '0.9', votes: 260, ideas: 31 },
];

describe('Chart', () => {
  it.each(['line', 'area', 'bar'] as const)('renders a labelled %s chart', (type) => {
    const { container } = render(
      <Chart
        type={type}
        data={data}
        x="build"
        series={[{ key: 'votes', label: 'Votes' }, { key: 'ideas', label: 'Ideas' }]}
        ariaLabel="Votes per build"
      />,
    );
    expect(container.querySelector('[aria-label="Votes per build"]')).not.toBeNull();
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('shows a legend for several series and hides it for one', () => {
    const { rerender } = render(
      <Chart data={data} x="build" series={[{ key: 'votes', label: 'Votes' }, { key: 'ideas', label: 'Ideas' }]} ariaLabel="Votes" />,
    );
    expect(screen.getByRole('list', { name: 'Legend' })).toHaveTextContent('VotesIdeas');
    rerender(<Chart data={data} x="build" series={[{ key: 'votes' }]} ariaLabel="Votes" />);
    expect(screen.queryByRole('list', { name: 'Legend' })).not.toBeInTheDocument();
  });

  it('cycles the palette', () => {
    expect(chartColor(0)).toBe('var(--ts-chart-1)');
    expect(chartColor(6)).toBe('var(--ts-chart-1)');
  });
});
