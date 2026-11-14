import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from './slider';

describe('Slider', () => {
  it('moves with the keyboard', async () => {
    const onValueChange = vi.fn();
    render(<Slider label="Speed" defaultValue={50} onValueChange={onValueChange} />);
    const thumb = screen.getByRole('slider');
    expect(thumb).toHaveValue('50');
    thumb.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.calls[0]?.[0]).toBe(51);
  });

  it('renders two thumbs for a range', () => {
    render(<Slider defaultValue={[20, 80]} />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });
});
