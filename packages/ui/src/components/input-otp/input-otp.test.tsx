import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputOTP } from './input-otp';

describe('InputOTP', () => {
  it('renders grouped slots with a separator', () => {
    render(<InputOTP length={6} groups={[3, 3]} aria-label="Verification code" />);
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
    expect(screen.getByRole('textbox', { name: 'Verification code' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Character 6 of 6' })).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('moves across slots while typing and reports completion', async () => {
    const onComplete = vi.fn();
    render(<InputOTP length={4} aria-label="PIN" onValueComplete={onComplete} />);
    await userEvent.click(screen.getByRole('textbox', { name: 'PIN' }));
    await userEvent.keyboard('1a234');
    expect(onComplete).toHaveBeenCalledWith('1234', expect.anything());
  });

  it('supports the compound form', () => {
    render(
      <InputOTP.Root length={2} size="lg">
        <span id="otp-label">First</span>
        <InputOTP.Group>
          <InputOTP.Slot aria-labelledby="otp-label" />
          <InputOTP.Slot aria-label="Second" />
        </InputOTP.Group>
      </InputOTP.Root>,
    );
    expect(screen.getByRole('textbox', { name: 'First' })).toHaveClass('size-control-lg');
  });
});
