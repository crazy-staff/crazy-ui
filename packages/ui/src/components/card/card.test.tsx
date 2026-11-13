import { render, screen } from '@testing-library/react';
import { Card } from './card';

describe('Card', () => {
  it('renders compound parts', () => {
    render(
      <Card.Root>
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Desc</Card.Description>
        </Card.Header>
        <Card.Body>Body</Card.Body>
      </Card.Root>,
    );
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('adds the interactive hover styles when asked', () => {
    render(<Card data-testid="c" interactive />);
    expect(screen.getByTestId('c')).toHaveClass('cursor-pointer');
  });
});
