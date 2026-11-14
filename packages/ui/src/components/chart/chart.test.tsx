import { fireEvent, render, screen } from '@testing-library/react';
import { Chart, chartColor } from './chart';
import { curveLinear, curveSmooth } from './curves';
import { makeValueFormatter, makeXFormatter } from './format';

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
    expect(screen.getAllByRole('button')).toHaveLength(2);
    rerender(<Chart data={data} x="build" series={[{ key: 'votes' }]} ariaLabel="Votes" />);
    expect(screen.queryByRole('list', { name: 'Legend' })).not.toBeInTheDocument();
  });

  it('cycles the palette', () => {
    expect(chartColor(0)).toBe('var(--ts-chart-1)');
    expect(chartColor(6)).toBe('var(--ts-chart-1)');
  });

  it('toggles series from the legend but keeps one on', () => {
    const onChange = vi.fn();
    render(
      <Chart
        data={data}
        x="build"
        series={[{ key: 'votes', label: 'Votes' }, { key: 'ideas', label: 'Ideas' }]}
        onHiddenSeriesChange={onChange}
        ariaLabel="Votes"
      />,
    );
    const votes = screen.getByRole('button', { name: 'Votes' });
    expect(votes).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(votes);
    expect(onChange).toHaveBeenLastCalledWith(['votes']);
    expect(votes).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(screen.getByRole('button', { name: 'Ideas' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('shows the empty and loading states', () => {
    const { rerender, container } = render(
      <Chart data={[]} x="build" series={[{ key: 'votes' }]} empty={{ title: 'No votes yet' }} ariaLabel="Votes" />,
    );
    expect(screen.getByText('No votes yet')).toBeInTheDocument();
    rerender(<Chart loading data={data} x="build" series={[{ key: 'votes' }]} ariaLabel="Votes" />);
    expect(screen.getByRole('figure', { name: 'Votes' })).toHaveAttribute('aria-busy', 'true');
    expect(container.querySelector('svg')).toBeNull();
  });
});

describe('chart curves', () => {
  const points = [[0, 10], [10, 0], [20, 10], [30, 10]] as const;

  it('draws straight segments', () => {
    expect(curveLinear.line(points)).toBe('M0,10L10,0L20,10L30,10');
  });

  it('draws a monotone smooth curve through every point without overshoot', () => {
    const path = curveSmooth.line(points);
    expect(path.startsWith('M0,10C')).toBe(true);
    expect(path.endsWith('30,10')).toBe(true);
    // At the dip (10,0) the tangent is flat, so both neighbouring control points sit at y = 0.
    expect(path).toContain(',0,10,0C13.33,0,');
    // The flat run stays flat: no control point above y = 10 after it.
    const ys = path.split(/[MC]/).join(',').split(',').filter(Boolean).filter((_, i) => i % 2 === 1).map(Number);
    expect(Math.max(...ys)).toBe(10);
    expect(Math.min(...ys)).toBe(0);
  });

  it('closes areas along the baseline', () => {
    expect(curveLinear.area([[0, 5], [10, 2]], [[0, 10], [10, 10]])).toBe('M0,5L10,2L10,10L0,10Z');
  });
});

describe('chart formats', () => {
  it('formats values and dates', () => {
    expect(makeValueFormatter('percent', 'en-US')(0.979)).toBe('97.9%');
    expect(makeValueFormatter('compact', 'en-US')(11300)).toBe('11.3K');
    expect(makeXFormatter('month', 'en-US')(new Date('2026-10-01'))).toBe('Oct');
    expect(makeXFormatter(undefined, 'en-US')('W32')).toBe('W32');
  });
});
