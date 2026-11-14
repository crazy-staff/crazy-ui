import { act, render, screen } from '@testing-library/react';
import { Toaster, toast } from './toast';

describe('toast', () => {
  it('shows a toast added with toast()', async () => {
    render(<Toaster />);
    act(() => {
      toast.success('Kit saved', { description: '12 items' });
    });
    expect(await screen.findByText('Kit saved')).toBeInTheDocument();
    expect(screen.getByText('12 items')).toBeInTheDocument();
    act(() => toast.close());
  });
});
