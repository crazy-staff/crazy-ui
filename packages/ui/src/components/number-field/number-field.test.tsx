import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumberField } from './number-field';

describe('NumberField', () => {
  it('steps with its own buttons and respects min and max', async () => {
    const onValueChange = vi.fn();
    render(<NumberField aria-label="Ore" defaultValue={9} min={0} max={10} onValueChange={onValueChange} />);
    const input = screen.getByRole('textbox', { name: 'Ore' });
    expect(input).toHaveValue('9');
    await userEvent.click(screen.getByRole('button', { name: 'Increase' }));
    expect(input).toHaveValue('10');
    expect(onValueChange).toHaveBeenLastCalledWith(10, expect.anything());
    expect(screen.getByRole('button', { name: 'Increase' })).toHaveAttribute('data-disabled');
    await userEvent.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(input).toHaveValue('9');
  });

  it('is never a native number input', () => {
    render(<NumberField aria-label="Level" defaultValue={1} />);
    expect(screen.getByRole('textbox', { name: 'Level' })).toHaveAttribute('type', 'text');
  });

  it('labels the input and steps with the arrow keys', async () => {
    render(<NumberField label="Hero level" defaultValue={5} step={5} />);
    const input = screen.getByRole('textbox', { name: 'Hero level' });
    await userEvent.click(input);
    await userEvent.keyboard('{ArrowUp}');
    expect(input).toHaveValue('10');
  });

  it('applies the size and hides the buttons on request', () => {
    const { container } = render(<NumberField aria-label="Gold" size="lg" hideButtons />);
    expect(container.querySelector('[class*="h-control-lg"]')).not.toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('supports the compound form', () => {
    render(
      <NumberField.Root defaultValue={3} size="sm">
        <NumberField.Group>
          <NumberField.Decrement aria-label="Less" />
          <NumberField.Input aria-label="Count" />
          <NumberField.Increment aria-label="More" />
        </NumberField.Group>
      </NumberField.Root>,
    );
    expect(screen.getByRole('textbox', { name: 'Count' })).toHaveValue('3');
    expect(screen.getByRole('button', { name: 'More' })).toHaveClass('aspect-square');
  });
});
