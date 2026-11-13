import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination, paginationRange } from './pagination';

describe('paginationRange', () => {
  it('shows everything for few pages', () => {
    expect(paginationRange(2, 5)).toEqual([1, 2, 3, 4, 5]);
  });
  it('collapses gaps with ellipses', () => {
    expect(paginationRange(10, 20)).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 20]);
  });
});

describe('Pagination', () => {
  it('marks the current page and changes page', async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={3} total={10} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('disables previous on the first page', () => {
    render(<Pagination page={1} total={10} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  });
});
