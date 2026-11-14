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

  it('builds header, body and footer from the short form', () => {
    render(
      <Card title="Infinite mana" description="Keeps the mana pool full." footer={<button type="button">Enable</button>}>
        Body text
      </Card>,
    );
    expect(screen.getByRole('heading', { name: 'Infinite mana' })).toBeInTheDocument();
    expect(screen.getByText('Keeps the mana pool full.')).toBeInTheDocument();
    expect(screen.getByText('Body text')).toHaveClass('p-5');
    expect(screen.getByRole('button', { name: 'Enable' })).toBeInTheDocument();
  });

  it('renders children as they are without short-form props', () => {
    render(<Card>plain</Card>);
    expect(screen.getByText('plain')).toHaveClass('rounded-card');
  });
});
