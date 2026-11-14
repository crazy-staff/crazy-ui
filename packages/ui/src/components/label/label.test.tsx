import { render, screen } from '@testing-library/react';
import { Label } from './label';

describe('Label', () => {
  it('labels its control', () => {
    render(
      <>
        <Label htmlFor="n">Name</Label>
        <input id="n" />
      </>,
    );
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('adds a hidden required marker', () => {
    render(
      <>
        <Label htmlFor="r" required>
          Title
        </Label>
        <input id="r" />
      </>,
    );
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden');
    expect(screen.getByLabelText(/Title/)).toBeInTheDocument();
  });
});
