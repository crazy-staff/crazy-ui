import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NativeSelect } from './native-select';

describe('NativeSelect', () => {
  it('renders options and reports changes', async () => {
    const onChange = vi.fn();
    render(
      <NativeSelect
        aria-label="Game"
        placeholder="Pick a game"
        defaultValue=""
        onChange={(e) => onChange(e.target.value)}
        options={[
          { value: 'g1', label: 'Gothic 1' },
          { value: 'g2', label: 'Gothic 2', disabled: true },
        ]}
      />,
    );
    const select = screen.getByRole('combobox', { name: 'Game' });
    expect(screen.getByRole('option', { name: 'Gothic 2' })).toBeDisabled();
    await userEvent.selectOptions(select, 'g1');
    expect(onChange).toHaveBeenCalledWith('g1');
  });

  it('takes option children, sizes and className', () => {
    render(
      <NativeSelect aria-label="Renderer" size="sm" className="w-40">
        <NativeSelect.OptGroup label="Supported">
          <NativeSelect.Option value="dx11">GD3D11</NativeSelect.Option>
        </NativeSelect.OptGroup>
      </NativeSelect>,
    );
    const select = screen.getByRole('combobox', { name: 'Renderer' });
    expect(select).toHaveClass('h-control-sm');
    expect(select.parentElement).toHaveClass('w-40');
    expect(screen.getByRole('group', { name: 'Supported' })).toBeInTheDocument();
  });
});
