import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleGroup } from './toggle-group';

describe('ToggleGroup', () => {
  it('keeps one item pressed by default', async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        defaultValue={['list']}
        onValueChange={onValueChange}
        items={[
          { value: 'list', label: 'List' },
          { value: 'grid', label: 'Grid' },
        ]}
      />,
    );
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(screen.getByRole('button', { name: 'Grid' }));
    expect(onValueChange.mock.calls[0]?.[0]).toEqual(['grid']);
  });
});
