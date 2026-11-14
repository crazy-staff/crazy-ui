import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from './radio-group';

describe('RadioGroup', () => {
  it('selects one option', async () => {
    render(
      <RadioGroup
        aria-label="Difficulty"
        defaultValue="normal"
        items={[
          { value: 'easy', label: 'Easy' },
          { value: 'normal', label: 'Normal' },
        ]}
      />,
    );
    const [easy, normal] = screen.getAllByRole('radio');
    expect(normal).toBeChecked();
    await userEvent.click(screen.getByText('Easy'));
    expect(easy).toBeChecked();
    expect(normal).not.toBeChecked();
  });
});
