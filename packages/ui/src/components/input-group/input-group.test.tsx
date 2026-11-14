import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputGroup } from './input-group';

describe('InputGroup', () => {
  it('renders add-ons around a working input', async () => {
    render(<InputGroup start={<span>@</span>} end={<span>.dev</span>} placeholder="name" />);
    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByText('.dev')).toBeInTheDocument();
    await userEvent.type(screen.getByPlaceholderText('name'), 'dawid');
    expect(screen.getByPlaceholderText('name')).toHaveValue('dawid');
  });
});
