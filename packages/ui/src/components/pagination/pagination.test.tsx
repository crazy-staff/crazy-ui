import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination, paginationRange } from './pagination';

describe('paginationRange', () => {
  it('shows everything for few pages', () => {
    expect(paginationRange(2, 5)).toEqual([1, 2, 3, 4, 5]);
  });
  it('collapses gaps with ellipses', () => {
    expect(paginationRange(10, 20)).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 20]);
  });
  it('keeps the same number of slots on every page', () => {
    expect(paginationRange(1, 20)).toEqual([1, 2, 3, 4, 5, 'ellipsis', 20]);
    expect(paginationRange(20, 20)).toEqual([1, 'ellipsis', 16, 17, 18, 19, 20]);
    for (let p = 1; p <= 20; p++) expect(paginationRange(p, 20)).toHaveLength(7);
    for (let p = 1; p <= 30; p++) expect(paginationRange(p, 30, 2)).toHaveLength(9);
  });
});

describe('Pagination', () => {
  it('marks the current page and changes page', async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={3} total={10} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).toHaveBeenCalledWith(4);
    await userEvent.click(screen.getByRole('button', { name: 'Page 10' }));
    expect(onPageChange).toHaveBeenLastCalledWith(10);
  });

  it('disables previous on the first page and next on the last', () => {
    const { rerender } = render(<Pagination page={1} total={10} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    rerender(<Pagination page={10} total={10} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('moves aria-current at once and rolls the numbers to the new range', async () => {
    vi.useFakeTimers();
    const { rerender } = render(<Pagination page={1} total={20} onPageChange={() => {}} />);
    rerender(<Pagination page={20} total={20} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Page 20' })).toHaveAttribute('aria-current', 'page');
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(screen.getByRole('button', { name: 'Page 17' })).toHaveTextContent('17');
    expect(screen.getByRole('button', { name: 'Page 20' })).toHaveAttribute('data-current');
    vi.useRealTimers();
  });
});
