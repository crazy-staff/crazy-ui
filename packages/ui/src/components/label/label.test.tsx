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
});
