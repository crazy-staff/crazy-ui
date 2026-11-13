import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('accepts multi-line text', async () => {
    render(<Textarea aria-label="notes" />);
    const el = screen.getByLabelText('notes');
    await userEvent.type(el, 'a{enter}b');
    expect(el).toHaveValue('a\nb');
  });
});
