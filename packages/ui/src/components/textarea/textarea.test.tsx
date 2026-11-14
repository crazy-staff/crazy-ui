import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('accepts multi-line text', async () => {
    render(<Textarea aria-label="notes" />);
    const el = screen.getByLabelText('notes');
    await userEvent.type(el, 'a{enter}b');
    expect(el).toHaveValue('a\nb');
  });

  it('turns off the native grip and renders its own', () => {
    render(<Textarea aria-label="notes" />);
    expect(screen.getByLabelText('notes')).toHaveClass('resize-none');
    expect(screen.getByRole('separator', { name: 'Resize' })).toBeInTheDocument();
  });

  it('has no grip with resize="none" or when disabled', () => {
    const { rerender } = render(<Textarea aria-label="notes" resize="none" />);
    expect(screen.queryByRole('separator')).toBeNull();
    rerender(<Textarea aria-label="notes" disabled />);
    expect(screen.queryByRole('separator')).toBeNull();
  });

  it('resizes with the arrow keys', () => {
    render(<Textarea aria-label="notes" />);
    const grip = screen.getByRole('separator');
    fireEvent.keyDown(grip, { key: 'ArrowDown' });
    expect(screen.getByLabelText('notes').style.height).toMatch(/px$/);
  });

  it('forwards its ref to the textarea', () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea aria-label="notes" ref={ref} />);
    expect(ref.current?.tagName).toBe('TEXTAREA');
  });

  it('sets a height on input with autoResize', async () => {
    render(<Textarea aria-label="notes" autoResize />);
    const el = screen.getByLabelText('notes');
    await userEvent.type(el, 'hello');
    expect(el.style.height).toMatch(/px$/);
  });
});
