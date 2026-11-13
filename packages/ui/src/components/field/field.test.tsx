import { render, screen } from '@testing-library/react';
import { Field } from './field';

describe('Field', () => {
  it('connects label and description to the control', () => {
    render(
      <Field label="Name" description="Shown in the menu.">
        <Field.Control placeholder="n" />
      </Field>,
    );
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('placeholder', 'n');
    expect(input).toHaveAccessibleDescription('Shown in the menu.');
  });

  it('shows an always-on error', () => {
    render(
      <Field label="Name" error="Required" errorMatch>
        <Field.Control />
      </Field>,
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
