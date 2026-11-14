import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleGroup } from './toggle-group';

const items = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
];

describe('ToggleGroup', () => {
  it('keeps one item pressed in single mode', async () => {
    const onValueChange = vi.fn();
    render(<ToggleGroup defaultValue={['list']} onValueChange={onValueChange} items={items} />);
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(screen.getByRole('button', { name: 'Grid' }));
    expect(onValueChange.mock.calls[0]?.[0]).toEqual(['grid']);
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('draws one soft accent fill behind the pressed item', async () => {
    render(<ToggleGroup defaultValue={['list']} items={items} />);
    const list = screen.getByRole('button', { name: 'List' });
    expect(list.querySelector('.bg-accent-soft')).not.toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Grid' }));
    expect(screen.getByRole('button', { name: 'Grid' }).querySelector('.bg-accent-soft')).not.toBeNull();
    expect(list.querySelector('.bg-accent-soft')).toBeNull();
  });

  it('lets several items be pressed with multiple', async () => {
    render(
      <ToggleGroup multiple aria-label="Overlays">
        <ToggleGroup.Item value="esp">ESP</ToggleGroup.Item>
        <ToggleGroup.Item value="radar">Radar</ToggleGroup.Item>
      </ToggleGroup>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'ESP' }));
    await userEvent.click(screen.getByRole('button', { name: 'Radar' }));
    expect(screen.getByRole('button', { name: 'ESP' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Radar' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('applies classNames per slot', () => {
    render(<ToggleGroup aria-label="View" items={items} classNames={{ root: 'w-full', item: 'flex-1' }} />);
    expect(screen.getByRole('group', { name: 'View' })).toHaveClass('w-full');
    expect(screen.getByRole('button', { name: 'List' })).toHaveClass('flex-1');
  });
});
