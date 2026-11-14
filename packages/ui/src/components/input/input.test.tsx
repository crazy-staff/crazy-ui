import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input', () => {
  it('accepts typed text', async () => {
    render(<Input placeholder="Email" />);
    const el = screen.getByPlaceholderText('Email');
    await userEvent.type(el, 'hi@x.dev');
    expect(el).toHaveValue('hi@x.dev');
  });

  it('forwards disabled', () => {
    render(<Input placeholder="Email" disabled />);
    expect(screen.getByPlaceholderText('Email')).toBeDisabled();
  });
});
