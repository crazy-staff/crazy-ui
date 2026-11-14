import { render, screen } from '@testing-library/react';
import { Reveal } from './reveal';

describe('Reveal', () => {
  it('renders its children', () => {
    render(<Reveal>hello</Reveal>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('renders grouped items', () => {
    render(
      <Reveal.Group>
        <Reveal.Item>a</Reveal.Item>
        <Reveal.Item>b</Reveal.Item>
      </Reveal.Group>,
    );
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });
});
