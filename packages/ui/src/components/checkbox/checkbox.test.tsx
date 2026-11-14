import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox, CheckboxGroup } from './checkbox';

describe('Checkbox', () => {
  it('toggles when its label is clicked', async () => {
    render(<Checkbox label="God mode" />);
    const box = screen.getByRole('checkbox');
    expect(box).not.toBeChecked();
    await userEvent.click(screen.getByText('God mode'));
    expect(box).toBeChecked();
  });

  it('collects values in a group', async () => {
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup defaultValue={[]} onValueChange={onValueChange}>
        <Checkbox name="a" value="a" label="A" />
        <Checkbox name="b" value="b" label="B" />
      </CheckboxGroup>,
    );
    await userEvent.click(screen.getByText('B'));
    expect(onValueChange.mock.calls[0]?.[0]).toEqual(['b']);
  });

  it('shows a description under the label', () => {
    render(<Checkbox label="ESP" description="Names over NPCs." />);
    expect(screen.getByText('Names over NPCs.')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /ESP/ })).toBeInTheDocument();
  });
});
