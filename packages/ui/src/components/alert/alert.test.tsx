import { render, screen } from '@testing-library/react';
import { Alert } from './alert';

describe('Alert', () => {
  it('renders title and text with a status role', () => {
    render(<Alert title="Heads up">New build is out.</Alert>);
    expect(screen.getByRole('status')).toHaveTextContent('Heads up');
    expect(screen.getByText('New build is out.')).toBeInTheDocument();
  });

  it('uses role=alert for danger', () => {
    render(<Alert variant="danger" title="Crash" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
